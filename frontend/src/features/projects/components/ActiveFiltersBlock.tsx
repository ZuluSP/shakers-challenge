'use client';

import { useState } from 'react';
import { Box, Flex, Text, Collapse, Group, ActionIcon, CloseButton } from '@mantine/core';
import { IconChevronUp } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilterOptions } from '../hooks/useFilterOptions';

const COLORS = {
  background: '#EDF7F6', 
  title: '#181B1A',      
  label: '#555E5C',      
  tagBg: '#FFFFFF',      
  border: '#181B1A',     
};

interface FilterItem {
  id: number;
  name: string;
}

export function ActiveFiltersBlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { options } = useFilterOptions();
  
  const [opened, setOpened] = useState(true);

  const activeFilters = {
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    skills: searchParams.get('skills')?.split(',').filter(Boolean) || [],
    category: searchParams.get('category')?.split(',').filter(Boolean) || [],
    industry: searchParams.get('industry')?.split(',').filter(Boolean) || [],
  };

  const hasFilters = Object.values(activeFilters).some(arr => arr.length > 0);

  if (!hasFilters) return null;

  const removeFilter = (key: string, idToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(',') || [];
    const newValues = currentValues.filter(id => id !== idToRemove);

    if (newValues.length > 0) {
      params.set(key, newValues.join(','));
    } else {
      params.delete(key);
    }

    router.push(`/?${params.toString()}`);
  };

  const getName = (id: string, list: FilterItem[] | undefined) => {
    return list?.find(item => item.id.toString() === id)?.name || id;
  };

  const renderRow = (label: string, ids: string[], dataList: FilterItem[], paramKey: string) => {
    if (ids.length === 0) return null;

    return (
      <Group align="flex-start" gap={8} style={{ minHeight: '28px' }}>
        <Text 
          w={120} 
          size="sm" 
          c={COLORS.label}
          style={{ fontFamily: 'GT Planar, sans-serif', lineHeight: '28px' }}
        >
          {label}:
        </Text>

        <Group gap={6} style={{ flex: 1 }}>
          {ids.map((id, index) => (
            <Flex key={id} align="center" gap={6}>
              {index > 0 && <Text size="sm" c={COLORS.label}>o</Text>}

              <Flex
                align="center"
                bg={COLORS.tagBg}
                pl="xs" pr={4}
                style={{
                  height: '28px',
                  borderRadius: '6px',
                  gap: '6px'
                }}
              >
                <Text size="xs" c={COLORS.title} style={{ fontFamily: 'GT Planar, sans-serif' }}>
                  {getName(id, dataList)}
                </Text>
                
                <CloseButton 
                  size="xs" 
                  radius="xl"
                  onClick={() => removeFilter(paramKey, id)}
                  aria-label={`Eliminar filtro ${getName(id, dataList)}`}
                />
              </Flex>
            </Flex>
          ))}
        </Group>
      </Group>
    );
  };

  return (
    <Box 
      mb={24}
      style={{
        backgroundColor: COLORS.background,
        borderRadius: '6px',
        padding: '16px 24px',
        transition: 'height 0.2s ease'
      }}
    >
      <Flex 
        justify="space-between" 
        align="center" 
        style={{ cursor: 'pointer' }}
        onClick={() => setOpened(!opened)}
      >
        <Text 
          fs="italic" 
          size="md" 
          c={COLORS.title}
          style={{ fontFamily: 'GT Planar, sans-serif', fontWeight: 400 }}
        >
          Filtros aplicados
        </Text>

        <ActionIcon 
          variant="transparent" 
          size="sm"
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: '50%', 
            width: '20px', height: '20px',
            transform: opened ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.2s'
          }}
        >
          <IconChevronUp size={12} color={COLORS.title} />
        </ActionIcon>
      </Flex>

      <Collapse in={opened}>
        <Box mt="md">
          <Flex direction="column" gap="sm">
            {renderRow('Especialidades', activeFilters.specialties, options?.specialties || [], 'specialties')}
            {renderRow('Habilidades', activeFilters.skills, options?.skills || [], 'skills')}
            {renderRow('Tipo de proyecto', activeFilters.category, options?.categories || [], 'category')}
            {renderRow('Industria', activeFilters.industry, options?.industries || [], 'industry')}
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
}