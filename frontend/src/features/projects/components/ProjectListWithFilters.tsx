'use client';

import { Project } from '../types/project.types';
import { ProjectCard } from './ProjectCard';
import { FiltersModal } from './FiltersModal';
import { ActiveFiltersBlock } from './ActiveFiltersBlock';
import { Button, Flex, Container } from '@mantine/core';
import { IconFilter, IconArrowDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  projects: Project[];
}

const TOOLBAR_COLORS = { text: '#033028', border: '#033028' };

export function ProjectListWithFilters({ projects }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size="xl" mt="lg" pb="xl">
      
      <FiltersModal opened={opened} onClose={close} />

      <Flex 
        justify="flex-end" 
        align="center"
        gap="md" 
        mb={8} 
        style={{ height: '52px' }}
      >
          <Button 
            variant="subtle" 
            onClick={open}
            leftSection={<IconFilter size={16} style={{ fill: TOOLBAR_COLORS.text, stroke: 'none' }} />}
            c={TOOLBAR_COLORS.text}
            radius="md"
            styles={{ root: { height: '28px', fontWeight: 400, fontSize: '14px' }, section: { marginRight: '6px' }}}
          >
            Filtrar
          </Button>
          
          <Button 
            variant="outline" 
            leftSection={<IconArrowDown size={16} />}
            c={TOOLBAR_COLORS.text}
            radius="md"
            styles={{ 
              root: { height: '28px', fontWeight: 400, fontSize: '14px', borderColor: TOOLBAR_COLORS.border, borderWidth: '1px' },
              section: { marginRight: '6px' }
            }}
          >
            publicación
          </Button>
      </Flex>

      <ActiveFiltersBlock />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        {projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            No se han encontrado proyectos con estos filtros.
          </div>
        )}
      </div>

    </Container>
  );
}