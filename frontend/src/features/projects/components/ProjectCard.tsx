'use client';

import { Project, Skill } from '../types/project.types';
import { Paper, Group, Stack, Text, Avatar, Badge, ActionIcon, Flex, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { 
  IconCurrencyEuro, 
  IconBrandReact, 
  IconBrandAngular, 
  IconBrandVue, 
  IconCode,
  IconBrandFigma
} from '@tabler/icons-react';

interface ProjectCardProps {
  project: Project;
}

const COLORS = {
  tagBg: '#F4F5F5',
  tagText: '#181B1A',
  metaText: '#0B5A4C',
  border: '#E4E7E7',
  brandText: '#AEB7B4',
  arrowIcon: '#033028',
  referralBg: '#EDF7F6',
  referralText: '#033028',
  referralEuro: '#181B1A',
  budgetBorder: '#6FBEB0',
};

const ExactArrowIcon = ({ color }: { color: string }) => (
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.00056 0L0.888559 0.00600004C0.710732 0.0259416 0.541513 0.0932337 0.398554 0.200858C0.255595 0.308482 0.144133 0.452494 0.0757956 0.617873C0.00745811 0.783252 -0.0152514 0.963938 0.0100355 1.14108C0.0353224 1.31823 0.107679 1.48535 0.219559 1.625L3.72056 6L0.220559 10.375C0.102842 10.522 0.029041 10.6993 0.00765228 10.8864C-0.0137364 11.0736 0.018157 11.2629 0.0996604 11.4327C0.181164 11.6025 0.308963 11.7459 0.468346 11.8462C0.627728 11.9466 0.812212 11.9999 1.00056 12H7.00056C7.15036 11.9999 7.29822 11.9662 7.43323 11.9013C7.56823 11.8363 7.68693 11.7419 7.78056 11.625L11.7806 6.625C11.9226 6.44764 11.9999 6.22721 11.9999 6C11.9999 5.77279 11.9226 5.55236 11.7806 5.375L7.78056 0.375C7.68693 0.258063 7.56823 0.163654 7.43323 0.0987473C7.29822 0.0338402 7.15036 9.36103e-05 7.00056 0H1.00056Z" fill={color}/>
</svg>

);

export function ProjectCard({ project }: ProjectCardProps) {
  const isMobile = useMediaQuery('(max-width: 48em)'); 
  const referralBonus = project.positions[0]?.referralBonus;

  const allSkills = project.positions.flatMap(p => p.skills);
  const uniqueSkills: Skill[] = Array.from(
    new Map(allSkills.map(skill => [skill.id, skill])).values()
  );

  const formatBudget = () => {
    const { hourFrom, hourTo, total } = project.budget;
    if (total) return `${total.toLocaleString('es-ES')} €`; 
    if (hourFrom && hourTo) return `${hourFrom} - ${hourTo} €/h`;
    return null;
  };

  const getTechIcon = (skillName: string) => {
    const lower = skillName.toLowerCase();
    if (lower.includes('react')) return <IconBrandReact size={14} />;
    if (lower.includes('angular')) return <IconBrandAngular size={14} />;
    if (lower.includes('vue')) return <IconBrandVue size={14} />;
    if (lower.includes('figma')) return <IconBrandFigma size={14} />;
    return <IconCode size={14} />;
  };

  return (
    <Box mb="sm">
      
      {referralBonus && (
        <Flex
          align="center"
          gap={6}
          bg={COLORS.referralBg}
          mb={8}
          style={{
            width: isMobile ? '100%' : 'fit-content', 
            height: '28px', 
            borderRadius: '6px',
            padding: '4px 8px',
          }}
        >
          <IconCurrencyEuro size={14} color={COLORS.referralEuro} stroke={2} />
          <Text size="xs" c={COLORS.referralText} style={{ fontFamily: 'GT Planar, sans-serif', lineHeight: '16px' }}>
            ¡Gana {referralBonus}€ por referir!
          </Text>
        </Flex>
      )}

      <Link href={`/project/${project.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <Paper 
          withBorder 
          radius="md" 
          bg="white"
          style={{ 
            width: '100%', 
            borderColor: COLORS.border,
            overflow: 'hidden',
            transition: 'box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          <Flex 
            direction={isMobile ? 'column' : 'row'}
            align="stretch" 
            justify="space-between" 
            style={{ minHeight: isMobile ? 'auto' : '106px' }}
          >
            
            <Box p="md" style={{ flex: 1 }}>
              
              <Group align="flex-start" wrap="nowrap" gap="md" mb={isMobile ? 'md' : 0}>
                
                <Stack gap={8} w={isMobile ? 48 : 82} align="center" style={{ flexShrink: 0 }}> 
                   <Avatar 
                      src={project.organization.logo} 
                      alt={project.organization.name} 
                      radius={6}
                      color="dark"
                      styles={{ 
                        root: { width: isMobile ? '48px' : '82px', height: isMobile ? '48px' : '82px' },
                        image: { objectFit: 'contain' }
                      }}
                    >
                      {project.organization.name[0]}
                    </Avatar>
                    
                    <Text 
                      size="xs" 
                      c={COLORS.brandText} 
                      ta="center"
                      lineClamp={1}
                      style={{ 
                        fontFamily: 'GT Planar, sans-serif', 
                        fontSize: '12px', 
                        width: '100%',
                        display: 'block' 
                      }}
                    >
                      {project.organization.name}
                    </Text>
                </Stack>

                <Stack gap={8} style={{ width: '100%' }}>
                  <Text fw={600} size="lg" lineClamp={2} c="black" style={{ lineHeight: '26px' }}>
                    {project.title}
                  </Text>

                  <Group gap={6} align="center" wrap="wrap">
                    <Text c={COLORS.metaText} size="sm" fw={400}>{project.category.name}</Text>
                    <Text c={COLORS.metaText} size="sm">|</Text>
                    <Text c={COLORS.metaText} size="sm" fw={400}>{project.organization.industry.name}</Text>

                    {formatBudget() && (
                      <>
                        <Text c={COLORS.metaText} size="sm">|</Text>
                        <Flex 
                          align="center" justify="center" 
                          style={{ 
                            width: '16px', height: '16px',
                            color: COLORS.budgetBorder 
                          }}
                        >
                          <IconCurrencyEuro size={20} stroke={2.2} />
                        </Flex>
                        <Text c={COLORS.metaText} size="sm" fw={500} suppressHydrationWarning>
                           {formatBudget()?.replace('€', '').trim()}
                        </Text>
                      </>
                    )}
                  </Group>
                  
                  <Group gap={6} mt={2} visibleFrom="sm" wrap="wrap">
                     {uniqueSkills.map((skill) => (
                      <Badge 
                        key={skill.id} bg={COLORS.tagBg} c={COLORS.tagText} leftSection={getTechIcon(skill.name)}
                        styles={{ root: { textTransform: 'none', borderRadius: '6px', height: '28px', fontWeight: 400, fontSize: '12px' } }}
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Group>

              <Group gap="xs" mt="xs" hiddenFrom="sm" wrap="wrap">
                  {uniqueSkills.map((skill) => (
                  <Badge 
                    key={skill.id} 
                    bg={COLORS.tagBg} c={COLORS.tagText} 
                    leftSection={getTechIcon(skill.name)}
                    styles={{ 
                      root: { 
                        textTransform: 'none', borderRadius: '6px', height: '28px', 
                        fontWeight: 400, fontSize: '12px'
                      } 
                    }}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </Group>

            </Box>

            <Flex 
              visibleFrom="sm"
              justify="center" align="center" 
              style={{ width: '48px', borderLeft: `1px solid ${COLORS.border}`, flexShrink: 0 }}
            >
              <ActionIcon variant="subtle" size={36} radius={6} aria-label="Ver detalles">
                <ExactArrowIcon color={COLORS.arrowIcon} />
              </ActionIcon>
            </Flex>

          </Flex>
        </Paper>
      </Link>
    </Box>
  );
}