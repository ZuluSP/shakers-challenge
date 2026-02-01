'use client';

import { useEffect, useState } from 'react';
import { Modal, Stack, Text, MultiSelect, NumberInput, Group, Radio, Button, Flex, Box } from '@mantine/core';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';

interface FiltersModalProps {
  opened: boolean;
  onClose: () => void;
}

const COLORS = {
  title: '#0D0D0D',
  label: '#181B1A',
  pillBg: '#EDF7F6', 
  pillText: '#033028',
  pillIcon: '#033028',
  border: '#E4E7E7',
  buttonRedText: '#CA4810',
  buttonGreenBg: '#033028',
};

export function FiltersModal({ opened, onClose }: FiltersModalProps) {
  const { options } = useFilterOptions();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (opened) {
      setSpecialties(searchParams.get('specialties')?.split(',').filter(Boolean) || []);
      setSkills(searchParams.get('skills')?.split(',').filter(Boolean) || []);
      setCategories(searchParams.get('category')?.split(',').filter(Boolean) || []);
      setIndustries(searchParams.get('industry')?.split(',').filter(Boolean) || []);
      setSortBy(searchParams.get('sortBy') || 'newest');
    }
  }, [opened, searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams();
    if (specialties.length > 0) params.set('specialties', specialties.join(','));
    if (skills.length > 0) params.set('skills', skills.join(','));
    if (categories.length > 0) params.set('category', categories.join(','));
    if (industries.length > 0) params.set('industry', industries.join(','));
    if (sortBy) params.set('sortBy', sortBy);

    router.push(`/?${params.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setSpecialties([]);
    setSkills([]);
    setCategories([]);
    setIndustries([]);
    setSortBy('newest');
  };

  const renderFilterRow = (label: string, data: { value: string; label: string }[], value: string[], onChange: (val: string[]) => void) => (
    <Box>
      <Text size="md" fw={400} mb={6} c={COLORS.label} style={{ fontFamily: 'GT Planar, sans-serif' }}>
        {label}
      </Text>
      <Group gap={8} align="flex-start" wrap="nowrap">
        <MultiSelect
          data={data}
          value={value}
          onChange={onChange}
          searchable
          placeholder={value.length === 0 ? "Busca y añade" : ""}
          rightSection={<IconChevronDown size={14} />}
          styles={{
            input: { minHeight: '36px', borderColor: COLORS.border, paddingTop: '6px', paddingBottom: '6px' },
            pill: { backgroundColor: COLORS.pillBg, color: COLORS.pillText, fontWeight: 400, fontSize: '10px', height: '22px', borderRadius: '6px' },
            section: { pointerEvents: 'none' }
          }}
          style={{ flex: 1 }}
        />
        <NumberInput
          defaultValue={0}
          min={0}
          w={55}
          styles={{
            input: {
              height: '36px',
              borderColor: COLORS.border,
              textAlign: 'center',
              paddingLeft: '0px', 
              paddingRight: '15px',
              fontSize: '14px'
            },
            controls: { 
              borderLeftColor: COLORS.border,
              width: '15px' 
            },
            control: { width: '15px', borderLeft: `1px solid ${COLORS.border}` }
          }}
        />
      </Group>
    </Box>
  );

  const specialtyOpts = options?.specialties?.map(s => ({ value: s.id.toString(), label: s.name })) || [];
  const skillOpts = options?.skills?.map(s => ({ value: s.id.toString(), label: s.name })) || [];
  const categoryOpts = options?.categories?.map(c => ({ value: c.id.toString(), label: c.name })) || [];
  const industryOpts = options?.industries?.map(i => ({ value: i.id.toString(), label: i.name })) || [];

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title="Filtrar Proyectos"
      size="580px" 
      padding="xl"
      radius="md"
      styles={{
        title: { fontSize: '24px', fontWeight: 400, fontFamily: 'GT Planar, sans-serif', color: COLORS.title },
        header: { marginBottom: '24px' },
        content: { maxWidth: '100%' }
      }}
    >
      <Stack gap={24}>
        {renderFilterRow('Especialidades', specialtyOpts, specialties, setSpecialties)}
        {renderFilterRow('Habilidades', skillOpts, skills, setSkills)}
        {renderFilterRow('Tipo de proyecto', categoryOpts, categories, setCategories)}
        {renderFilterRow('Industria', industryOpts, industries, setIndustries)}

        <Box>
          <Text size="md" fw={400} mb={16} c={COLORS.label} style={{ fontFamily: 'GT Planar, sans-serif' }}>
            Ordenar por
          </Text>
          <Radio.Group value={sortBy} onChange={setSortBy}>
            <Stack gap={12}>
              <Radio value="newest" label="Fecha de publicación (Más reciente primero)" color="dark" />
              <Radio value="oldest" label="Fecha de publicación (Más antiguo primero)" color="dark" />
            </Stack>
          </Radio.Group>
        </Box>

        <Flex 
          direction={{ base: 'column-reverse', sm: 'row' }}
          justify="space-between" 
          align="center" 
          gap={24} 
          mt={20}
        >
          <Button 
            variant="subtle" fullWidth h={46} c={COLORS.buttonRedText}
            onClick={handleClear}
            styles={{ root: { fontSize: '16px', fontWeight: 400, fontFamily: 'GT Planar, sans-serif' }}}
          >
            Eliminar Filtros
          </Button>

          <Button 
            variant="filled" color={COLORS.buttonGreenBg} fullWidth h={46}
            onClick={handleApply}
            styles={{ root: { fontSize: '16px', fontWeight: 400, fontFamily: 'GT Planar, sans-serif' }}}
          >
            Filtrar
          </Button>
        </Flex>

      </Stack>
    </Modal>
  );
}