'use client';

import { Project } from '@/features/projects/types/project.types';
import { Box, Container, Flex, Text, Button, Avatar, Accordion, Badge, Stack, Group, Paper, Transition } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { 
  IconArrowLeft, 
  IconCalendarEvent, 
  IconClock, 
  IconCurrencyEuro, 
  IconUsers, 
  IconCheck 
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const COLORS = {
  bgHeader: '#FFFFFFCC',
  breadcrumbText: '#555E5C',
  titleText: '#181B1A',
  greenHeaderBg: '#033028',
  whiteText: '#FFFFFF',
  badgeBg: '#EDF7F6',
  badgeText: '#033028',
  sectionTitle: '#033028',
  bodyText: '#555E5C',
  yellowBtn: '#F0FF3D',
  redBorder: '#CA4810',
  redText: '#CA4810',
  appliedBg: '#F8F9EC',
  labelBg: '#FFFFFF',
  labelText: '#181B1A',
  faqOpenBg: '#EDF7F6',
  faqBorder: '#EDF7F6',
  toastBg: '#EDF7F6',
  toastText: '#033028',
};

export function ProjectDetailView({ project }: { project: Project }) {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 48em)'); 
  
  const [isApplied, setIsApplied] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  
  const showToast = isApplied; 

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES');
  const formatBudget = () => {
    if (project.budget.total) return `${project.budget.total.toLocaleString('es-ES')} € (Estimado)`;
    return `${project.budget.hourFrom} - ${project.budget.hourTo} €/h`;
  };

  const handleApply = () => {
    setIsApplied(true);
  };

  const handleWithdraw = () => {
    setIsApplied(false);
  };

  return (
    <Box pb={100}>
      
      <Box 
        style={{
          height: isMobile ? '68px' : '102px',
          width: '100%',
          backgroundColor: COLORS.bgHeader,
          backdropFilter: 'blur(10px)',
          paddingTop: isMobile ? '20px' : '32px',
          paddingLeft: isMobile ? '16px' : '32px',
          paddingRight: isMobile ? '16px' : '32px',
          display: 'flex',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}
      >
        <Flex 
          align="center" 
          justify="space-between"
          w={{ base: '100%', lg: 1360 }} 
          mx="auto"
        >
          <Flex gap={12} align="center">
            <Button 
              variant="subtle" 
              color="green" 
              size="sm" 
              h={28} 
              w={isMobile ? 28 : 'auto'} 
              radius={6}
              onClick={() => router.back()}
              styles={{ 
                root: { 
                  color: COLORS.badgeText, 
                  backgroundColor: 'transparent',
                  padding: 0, 
                  paddingRight: isMobile ? 0 : '8px',
                  display: 'flex',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                },
                section: { marginRight: isMobile ? 0 : 8 }
              }}
            >
              <IconArrowLeft size={16} />
              {!isMobile && "Atrás"}
            </Button>

            <Group gap={6} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <Text size="xs" c={COLORS.breadcrumbText} visibleFrom="sm">Buscador Proyectos</Text>
              <Text size="xs" c={COLORS.breadcrumbText} visibleFrom="sm">/</Text>
              <Text size="xs" fw={700} fs="italic" c={COLORS.titleText} truncate>
                {project.title}
              </Text>
            </Group>
          </Flex>

          {!isMobile && (
            <Transition transition="fade" mounted={showToast} duration={400}>
              {(styles) => (
                <Box style={styles}>
                  <SuccessToast isMobile={false} />
                </Box>
              )}
            </Transition>
          )}

        </Flex>
      </Box>

      <Container size="xl" mt={isMobile ? 24 : 40} px={isMobile ? 'md' : 0} style={{ maxWidth: '1360px', position: 'relative' }}>
        
        {isMobile && (
          <Transition transition="slide-down" mounted={showToast} duration={400}>
            {(styles) => (
              <Box
                style={{
                  ...styles,
                  position: 'absolute',
                  top: '-19px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                }}
              >
                <SuccessToast isMobile={true} />
              </Box>
            )}
          </Transition>
        )}

        <Box 
          bg={COLORS.greenHeaderBg} 
          style={{ 
            borderRadius: '8px', 
            padding: isMobile ? '24px 16px' : '24px 32px', 
            minHeight: isMobile ? '222px' : '152px', 
            height: 'auto', 
            color: 'white',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          <Stack gap={16}>
            <Flex justify="space-between" align="flex-start">
              <Text 
                fw={400} 
                style={{ 
                  fontSize: '24px', 
                  fontFamily: 'GT Planar, sans-serif', 
                  lineHeight: '140%',
                  width: isMobile ? '100%' : 'auto' 
                }}
              >
                {project.title}
              </Text>
              
              <Badge 
                visibleFrom="sm"
                variant="light" color="teal" size="lg" radius="md" 
                leftSection={<Box w={6} h={6} bg={COLORS.badgeText} style={{borderRadius:'50%'}} />}
                styles={{ root: { backgroundColor: COLORS.badgeBg, color: COLORS.badgeText, textTransform: 'none', height: '28px' }}}
              >
                {project.category.name}
              </Badge>
            </Flex>

            <Text size="lg" style={{ fontSize: '18px', color: COLORS.whiteText }}>
              {project.positions[0]?.title || 'Rol Principal'}
            </Text>

            <Group gap={8} style={{ width: '100%' }}>
              <MetadataLabel icon={IconCalendarEvent} text={`Inicio: ${formatDate(project.startDate)}`} />
              <MetadataLabel icon={IconClock} text={`${project.totalHours} horas`} />
              <MetadataLabel icon={IconCurrencyEuro} text={formatBudget()} />
              <MetadataLabel icon={IconUsers} text="2 Talentos" /> 
            </Group>
          </Stack>
        </Box>

        <Stack gap={isMobile ? 40 : 64} mt={isMobile ? 40 : 64}>
          <Box>
            <Text size="lg" fw={400} c={COLORS.sectionTitle} mb={12} style={{ fontSize: '18px' }}>
              Descripción del Proyecto
            </Text>
            <Text size="sm" c={COLORS.bodyText} style={{ lineHeight: '20px' }}>
              {project.description}
            </Text>
          </Box>

          <Box>
            <Text size="lg" fw={400} c={COLORS.sectionTitle} mb={12} style={{ fontSize: '18px' }}>
              ¿Cuáles son los objetivos y tareas a realizar?
            </Text>
            <Stack gap={8}>
              {project.goals.map((goal, index) => (
                <Text key={index} size="sm" c={COLORS.bodyText} style={{ lineHeight: '20px' }}>
                  {goal}
                </Text>
              ))}
            </Stack>
          </Box>

          <Box>
            <Text size="lg" fw={400} c={COLORS.sectionTitle} mb={12} style={{ fontSize: '18px' }}>
              Preguntas Frecuentes
            </Text>
            <Accordion 
              variant="separated" 
              radius="xs"
              value={accordionValue}
              onChange={setAccordionValue}
              styles={{
                item: { 
                  border: `2px solid ${COLORS.badgeBg}`, 
                  backgroundColor: 'white', 
                  marginBottom: '12px',
                  borderRadius: '6px',
                  '&[dataActive]': { backgroundColor: COLORS.faqOpenBg, borderColor: COLORS.faqOpenBg }
                },
                control: { 
                  padding: '12px 16px', color: COLORS.titleText, fontWeight: 400, fontSize: '12px',
                  '&:hover': { backgroundColor: 'transparent' }
                },
                content: { padding: '16px' },
                chevron: { color: COLORS.titleText, width: 8, height: 4 }
              }}
            >
              {project.faqs.map((faq, idx) => {
                const value = `faq-${idx}`;
                const isActive = accordionValue === value;
                return (
                  <Accordion.Item key={idx} value={value} style={{ backgroundColor: isActive ? COLORS.faqOpenBg : 'white' }}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </Box>

          <Flex gap={isMobile ? 64 : 64} direction={{ base: 'column-reverse', md: 'row' }} wrap="nowrap" align="flex-start">
            
            <Box w={{ base: '100%', md: 300 }}>
              <Text size="lg" fw={400} c={COLORS.sectionTitle} mb={12} style={{ fontSize: '18px' }}>Responsable</Text>
              <Stack gap={12}>
                <Group gap={12}>
                  <Avatar src={project.organization.logo} size={24} radius={4} />
                  <Text size="sm" c={COLORS.titleText}>{project.organization.name}</Text>
                </Group>
                <Box w="100%" h="auto" style={{ borderRadius: '6px', background: 'linear-gradient(242.45deg, #202020 7.83%, #262626 91.43%)', overflow: 'hidden', aspectRatio: '1/1' }}>
                  <Avatar src={`https://ui-avatars.com/api/?name=${project.projectLeader.name}+${project.projectLeader.lastName}&size=500`} style={{ width: '100%', height: '100%' }} radius={0} />
                </Box>
                <Box>
                  <Text size="xl" c={COLORS.titleText} style={{ fontSize: '20px' }}>{project.projectLeader.name} {project.projectLeader.lastName}</Text>
                  <Text size="sm" c={COLORS.bodyText}>Project Owner</Text>
                </Box>
              </Stack>
            </Box>

            <Box w={{ base: '100%', md: 300 }}>
              <Text size="lg" fw={400} c={COLORS.sectionTitle} mb={12} style={{ fontSize: '18px' }}>Equipo</Text>
              <Paper withBorder p="lg" radius="lg" style={{ borderColor: COLORS.badgeBg }}>
                <Stack gap={16}>
                  {isApplied && (
                    <Badge leftSection={<IconCheck size={12} />} color="yellow" variant="light" styles={{ root: { backgroundColor: COLORS.appliedBg, color: COLORS.titleText, textTransform: 'none', height: '28px' } }}>Aplicado</Badge>
                  )}
                  <Box>
                    <Text size="xl" c={COLORS.titleText} style={{ fontSize: '20px', marginBottom: '4px' }}>{project.positions[0]?.title || 'Rol'}</Text>
                    <Text size="sm" c={COLORS.bodyText}>{project.positions[0]?.skills.map(s => s.name).join(', ')}</Text>
                  </Box>
                  {isApplied ? (
                    <Button variant="outline" fullWidth color="red" onClick={handleWithdraw} styles={{ root: { borderColor: COLORS.redBorder, color: COLORS.redText }}}>Retirar Candidatura</Button>
                  ) : (
                    <Button variant="filled" fullWidth color="yellow" onClick={handleApply} styles={{ root: { backgroundColor: COLORS.yellowBtn, color: COLORS.titleText }}}>Aplicar</Button>
                  )}
                </Stack>
              </Paper>
            </Box>

          </Flex>

        </Stack>
      </Container>
    </Box>
  );
}

function MetadataLabel({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <Badge 
      leftSection={<Flex align="center" justify="center" h="100%"><Icon size={14} style={{ color: COLORS.labelText }} /></Flex>}
      size="lg" radius="md"
      styles={{ root: { backgroundColor: COLORS.labelBg, color: COLORS.labelText, textTransform: 'none', height: '28px', fontWeight: 400, fontFamily: 'GT Planar, sans-serif', fontSize: '12px', paddingLeft: '12px', paddingRight: '12px', border: 'none', display: 'flex', alignItems: 'center' }, section: { marginRight: 6, display: 'flex', alignItems: 'center' }, label: { transform: 'translateY(1px)' }}}
    >
      {text}
    </Badge>
  );
}

function SuccessToast({ isMobile }: { isMobile: boolean }) {
  return (
    <Box
      style={{
        width: '243px',
        height: '38px',
        backgroundColor: COLORS.toastBg,
        color: COLORS.toastText,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: 'GT Planar, sans-serif', fontSize: '16px', fontWeight: 400 }}>
        Aplicación enviada con éxito
      </Text>
    </Box>
  );
}