'use client';


import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Plus, Trash2, Edit, Download } from 'lucide-react';
import { H1, H2, H3, Text, Caption } from '@/common/components/ui-tailwind/Typography';
import { Button } from '@/common/components/ui-tailwind/Button';
import { Input, Textarea, Select } from '@/common/components/ui-tailwind/Input';
import { Switch, Checkbox, SegmentedControl } from '@/common/components/ui-tailwind/Switch';
import { Slider } from '@/common/components/ui-tailwind/Slider';
import { Card, SectionCard, KPICard } from '@/common/components/ui-tailwind/Card';
import { Badge, StatusPill } from '@/common/components/ui-tailwind/Badge';
import { Table } from '@/common/components/ui-tailwind/Table';
import { Modal, ConfirmModal } from '@/common/components/ui-tailwind/Modal';
import { Alert } from '@/common/components/ui-tailwind/Alert';
import { Sidebar } from '@/common/components/ui-tailwind/Sidebar';
import { Header } from '@/common/components/ui-tailwind/Header';
import { PageContainer } from '@/common/components/ui-tailwind/PageContainer';
import { Separator } from '@/common/components/ui-tailwind/Separator';
import { Accordion } from '@/common/components/ui-tailwind/Accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/common/components/ui-tailwind/Tabs';
import { Progress } from '@/common/components/ui-tailwind/Progress';
import { Breadcrumb } from '@/common/components/ui-tailwind/Breadcrumb';
import { Tooltip } from '@/common/components/ui-tailwind/Tooltip';
import { Pagination } from '@/common/components/ui-tailwind/Pagination';
import { Spinner } from '@/common/components/ui-tailwind/Spinner';
import { Stepper } from '@/common/components/ui-tailwind/Stepper';
import { Drawer } from '@/common/components/ui-tailwind/Drawer';
import { MiniLineChart, MiniBarChart } from '@/common/components/ui-tailwind/Chart';

export default function ShowcasePage() {
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(true);
  const [segmentedValue, setSegmentedValue] = useState('option1');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.palette.background.default }}>
      <div className="w-full p-8 space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4">
          <H1>Design System & Component Library</H1>
          <Text className="text-[#A0A0A0]">
            Libreria completa di componenti UI per piattaforma SaaS multi-tenant. 
            Tutti i componenti sono modulari, riutilizzabili e seguono il design system definito.
          </Text>
        </div>

        {/* Typography Section */}
        <Section title="Typography" subtitle="Gerarchia tipografica definita con scale coerente">
          <div className="space-y-4">
            <H1>Heading 1 - 32px</H1>
            <H2>Heading 2 - 26px</H2>
            <H3>Heading 3 - 22px</H3>
            <Text>Paragraph - 16px - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            <Caption>Caption - 12px - Testo secondario o annotazioni</Caption>
          </div>
        </Section>

        {/* Buttons Section */}
        <Section title="Buttons" subtitle="Varianti di pulsanti per tutte le azioni">
          <div className="space-y-6">
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Primary (Verde - Azioni Principali)</Caption>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="md" disabled>Disabled</Button>
              </div>
            </div>
            
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Secondary (Blu - Azioni Secondarie)</Caption>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="md">
                  <Plus size={16} />
                  Con Icona
                </Button>
                <Button variant="secondary" size="md">Secondary</Button>
              </div>
            </div>
            
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Minimal (Turchese Outline)</Caption>
              <div className="flex flex-wrap gap-3">
                <Button variant="minimal" size="md">Minimal</Button>
              </div>
            </div>
            
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Danger (Rosso - Azioni Distruttive)</Caption>
              <div className="flex flex-wrap gap-3">
                <Button variant="danger" size="md">
                  <Trash2 size={16} />
                  Elimina
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Input Section */}
        <Section title="Form Inputs" subtitle="Campi di input con validazione e stati">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Nome Tenant" 
              placeholder="Inserisci nome..." 
            />
            <Input 
              label="Email" 
              placeholder="email@example.com" 
              type="email"
            />
            <Input 
              label="Input con Errore" 
              placeholder="Campo obbligatorio" 
              error="Questo campo è obbligatorio"
            />
            <Select 
              label="Seleziona Piano"
              options={[
                { value: 'basic', label: 'Basic' },
                { value: 'pro', label: 'Professional' },
                { value: 'enterprise', label: 'Enterprise' }
              ]}
            />
            <div className="md:col-span-2">
              <Textarea 
                label="Descrizione" 
                placeholder="Inserisci una descrizione..."
                rows={4}
              />
            </div>
          </div>
        </Section>

        {/* Switches & Checkboxes */}
        <Section title="Switches & Toggles" subtitle="Controlli interattivi per impostazioni">
          <div className="space-y-6">
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Switch</Caption>
              <div className="space-y-3">
                <Switch 
                  checked={switchValue} 
                  onChange={setSwitchValue} 
                  label="Abilita notifiche email"
                />
                <Switch 
                  checked={true} 
                  onChange={() => {}} 
                  label="Multi-tenant abilitato"
                />
                <Switch 
                  checked={false} 
                  onChange={() => {}} 
                  label="Modalità manutenzione"
                  disabled
                />
              </div>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Checkbox</Caption>
              <div className="space-y-3">
                <Checkbox 
                  checked={checkboxValue} 
                  onChange={setCheckboxValue} 
                  label="Accetto i termini e condizioni"
                />
                <Checkbox 
                  checked={false} 
                  onChange={() => {}} 
                  label="Invia report settimanale"
                />
              </div>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Segmented Control</Caption>
              <SegmentedControl 
                options={[
                  { value: 'option1', label: 'Giornaliero' },
                  { value: 'option2', label: 'Settimanale' },
                  { value: 'option3', label: 'Mensile' }
                ]}
                value={segmentedValue}
                onChange={setSegmentedValue}
              />
            </div>
          </div>
        </Section>

        {/* Cards Section */}
        <Section title="Cards" subtitle="Contenitori per raggruppare informazioni">
          <div className="space-y-6">
            <div>
              <Caption className="text-[#A0A0A0] mb-3">KPI Cards con Mini Charts</Caption>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KPICard 
                  title="Tenants Attivi"
                  value="127"
                  change={{ value: 12.5, isPositive: true }}
                  chartData={[45, 52, 48, 61, 58, 67, 71, 69, 75, 72, 78, 84]}
                />
                <KPICard 
                  title="Revenue Mensile"
                  value="€ 45,320"
                  change={{ value: 8.2, isPositive: true }}
                  chartData={[30, 35, 40, 38, 45, 50, 48, 55, 58, 60, 62, 65]}
                />
                <KPICard 
                  title="Churn Rate"
                  value="2.4%"
                  change={{ value: 0.8, isPositive: false }}
                  chartData={[8, 7, 9, 8, 7, 6, 5, 6, 5, 4, 3, 4]}
                />
              </div>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Simple Card</Caption>
              <Card>
                <H3 className="mb-2">Titolo Card</H3>
                <Text className="text-[#A0A0A0]">
                  Questo è un esempio di card semplice. Può contenere qualsiasi tipo di contenuto.
                </Text>
              </Card>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Section Card con Header</Caption>
              <SectionCard 
                title="Impostazioni Generali"
                subtitle="Configura le impostazioni base della piattaforma"
                action={
                  <Button variant="minimal" size="sm">
                    <Edit size={16} />
                    Modifica
                  </Button>
                }
              >
                <div className="space-y-4">
                  <Input label="Nome Piattaforma" placeholder="SaaS Platform" />
                  <Input label="Email Supporto" placeholder="support@platform.com" />
                  <Switch checked={true} onChange={() => {}} label="Registrazione pubblica" />
                </div>
              </SectionCard>
            </div>
          </div>
        </Section>

        {/* Badges & Status */}
        <Section title="Badges & Status" subtitle="Indicatori di stato e categorie">
          <div className="space-y-6">
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Badges</Caption>
              <div className="flex flex-wrap gap-3">
                <Badge variant="active">Attivo</Badge>
                <Badge variant="inactive">Inattivo</Badge>
                <Badge variant="warning">Attenzione</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Successo</Badge>
                <Badge variant="danger">Errore</Badge>
              </div>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Status Pills con Dot</Caption>
              <div className="flex flex-wrap gap-4">
                <StatusPill status="active" label="Online" />
                <StatusPill status="inactive" label="Offline" />
                <StatusPill status="warning" label="Manutenzione" />
              </div>
            </div>
          </div>
        </Section>

        {/* Table Section */}
        <Section title="Table" subtitle="Tabella responsiva con dati">
          <Table 
            columns={[
              { header: 'Tenant', accessor: 'name' },
              { header: 'Piano', accessor: 'plan' },
              { 
                header: 'Status', 
                accessor: 'status',
                cell: (value) => <StatusPill status={value} label={value === 'active' ? 'Attivo' : 'Inattivo'} />
              },
              { header: 'Utenti', accessor: 'users' },
              { header: 'MRR', accessor: 'mrr' },
              { 
                header: 'Azioni', 
                accessor: 'id',
                cell: () => (
                  <div className="flex gap-2">
                    <button className="text-[#3A6BFF] hover:text-[#2f5ce6]">
                      <Edit size={16} />
                    </button>
                    <button className="text-[#FF5D5D] hover:text-[#e64e4e]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )
              }
            ]}
            data={[
              { id: 1, name: 'Acme Corp', plan: 'Enterprise', status: 'active', users: 145, mrr: '€ 2,499' },
              { id: 2, name: 'TechStart SRL', plan: 'Professional', status: 'active', users: 42, mrr: '€ 499' },
              { id: 3, name: 'Digital Agency', plan: 'Basic', status: 'active', users: 12, mrr: '€ 99' },
              { id: 4, name: 'Consulting Group', plan: 'Professional', status: 'inactive', users: 67, mrr: '€ 499' },
              { id: 5, name: 'Innovation Labs', plan: 'Enterprise', status: 'active', users: 203, mrr: '€ 2,499' }
            ]}
          />
        </Section>

        {/* Charts Section */}
        <Section title="Mini Charts" subtitle="Grafici compatti per visualizzazioni inline">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <Caption className="text-[#A0A0A0] mb-3">Mini Line Chart</Caption>
              <MiniLineChart 
                data={[30, 45, 42, 60, 55, 70, 68, 85, 82, 95, 90, 100]}
                height={80}
                color="#2BE4CE"
              />
            </Card>
            
            <Card>
              <Caption className="text-[#A0A0A0] mb-3">Mini Bar Chart</Caption>
              <MiniBarChart 
                data={[20, 35, 30, 50, 45, 60, 55, 70, 65, 80, 75, 85]}
                height={80}
                color="#3A6BFF"
              />
            </Card>
          </div>
        </Section>

        {/* Modals Section */}
        <Section title="Modals" subtitle="Dialog e conferme">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Apri Modal
            </Button>
            <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>
              Apri Confirm Modal
            </Button>
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
              Apri Drawer
            </Button>
          </div>

          <Modal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)}
            title="Crea Nuovo Tenant"
            footer={
              <>
                <Button variant="minimal" onClick={() => setModalOpen(false)}>
                  Annulla
                </Button>
                <Button variant="primary">
                  Crea Tenant
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <Input label="Nome Tenant" placeholder="Acme Corp" />
              <Input label="Email Admin" placeholder="admin@acme.com" type="email" />
              <Select 
                label="Piano"
                options={[
                  { value: 'basic', label: 'Basic - € 99/mese' },
                  { value: 'pro', label: 'Professional - € 499/mese' },
                  { value: 'enterprise', label: 'Enterprise - € 2,499/mese' }
                ]}
              />
              <Textarea label="Note" placeholder="Note aggiuntive..." rows={3} />
            </div>
          </Modal>

          <ConfirmModal 
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={() => console.log('Confermato!')}
            title="Conferma Eliminazione"
            message="Sei sicuro di voler eliminare questo tenant? Questa azione non può essere annullata."
            confirmText="Elimina"
            cancelText="Annulla"
            variant="danger"
          />

          <Drawer 
            isOpen={drawerOpen} 
            onClose={() => setDrawerOpen(false)}
            title="Dettagli Configurazione"
          >
             <div className="space-y-6">
                <Text>
                   Questo è un componente Drawer (pannello laterale). È utile per modifiche rapide, filtri o dettagli di un elemento selezionato.
                </Text>
                <Separator />
                <div className="space-y-4">
                  <Input label="Impostazione 1" />
                  <Input label="Impostazione 2" />
                  <Switch checked={true} onChange={() => {}} label="Opzione A" />
                  <Switch checked={false} onChange={() => {}} label="Opzione B" />
                </div>
             </div>
          </Drawer>
        </Section>

        {/* New UI Tailwind Components */}
        <Section title="Navigation & Disclosure" subtitle="Accordion e Tabs">
          <div className="space-y-6">
            <Card>
              <Caption className="text-[#A0A0A0] mb-3">Accordion</Caption>
              <Accordion 
                items={[
                  { title: 'Sezione 1', content: 'Contenuto nascosto della sezione 1. React e Tailwind only.' },
                  { title: 'Sezione 2', content: 'Contenuto nascosto della sezione 2.' },
                  { title: 'Sezione 3', content: 'Contenuto nascosto della sezione 3.' }
                ]}
              />
            </Card>

            <Card>
              <Caption className="text-[#A0A0A0] mb-3">Tabs</Caption>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="p-4 bg-[#141517] rounded-md mt-2">
                    <Text>Impostazioni Account qui.</Text>
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="p-4 bg-[#141517] rounded-md mt-2">
                    <Text>Modifica la tua password qui.</Text>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            <Card>
               <Caption className="text-[#A0A0A0] mb-3">Breadcrumb</Caption>
               <Breadcrumb 
                 items={[
                   { label: 'Home', href: '/' },
                   { label: 'Settings', href: '/settings' },
                   { label: 'Profile' }
                 ]} 
               />
            </Card>
          </div>
        </Section>

        <Section title="Feedback & Loading" subtitle="Alerts, Skeleton, Spinner, Progress">
          <div className="space-y-6">
            <div className="space-y-2">
              <Alert variant="info" title="Info">
                Questo è un avviso informativo standard.
              </Alert>
              <Alert variant="success" title="Successo">
                Operazione completata con successo.
              </Alert>
              <Alert variant="destructive" title="Errore">
                Si è verificato un errore critico.
              </Alert>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <Caption className="text-[#A0A0A0] mb-3">Progress & Turni</Caption>
                <div className="space-y-4">
                  <Progress value={65} />
                  <div className="flex items-center gap-2">
                     <Spinner size="sm" />
                     <Text className="text-sm">Caricamento in corso...</Text>
                  </div>
                </div>
              </Card>

              <Card>
                 <Caption className="text-[#A0A0A0] mb-3">Slider & Tooltip</Caption>
                 <div className="space-y-6 pt-2">
                   <Slider value={40} onChange={() => {}} />
                   <div className="flex justify-center">
                      <Tooltip content="Tooltip informativo">
                        <Button variant="minimal" size="sm">Hover me</Button>
                      </Tooltip>
                   </div>
                 </div>
              </Card>
            </div>
          </div>
        </Section>

        <Section title="Data Helpers" subtitle="Pagination & Stepper">
           <Card className="space-y-8">
              <div>
                <Caption className="text-[#A0A0A0] mb-4">Stepper</Caption>
                <Stepper 
                  currentStep={1} 
                  steps={[
                    { label: 'Dati Generali', description: 'Info base' },
                    { label: 'Configurazione', description: 'Parametri' },
                    { label: 'Revisione', description: 'Controllo finale' }
                  ]} 
                />
              </div>
              
              <Separator />

              <div className="flex flex-col items-center gap-2">
                <Caption className="text-[#A0A0A0]">Pagination</Caption>
                <Pagination 
                   currentPage={currentPage} 
                   totalPages={10} 
                   onPageChange={setCurrentPage} 
                />
              </div>
           </Card>
        </Section>

        <Separator className="my-8" />

        {/* Layout Components */}
        <Section title="Layout Components" subtitle="Sidebar, Header e Container">
          <div className="space-y-6">
            <div>
              <Caption className="text-[#A0A0A0] mb-3">Sidebar (Preview ridotta)</Caption>
              <div className="h-[500px] border border-[#2A2B2E] rounded-lg overflow-hidden">
                <Sidebar />
              </div>
            </div>

            <div>
              <Caption className="text-[#A0A0A0] mb-3">Header</Caption>
              <div className="border border-[#2A2B2E] rounded-lg overflow-hidden">
                <Header 
                  title="Dashboard Super Admin"
                  subtitle="Panoramica completa della piattaforma multi-tenant"
                  action={
                    <Button variant="primary">
                      <Plus size={16} />
                      Nuovo Tenant
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Complete Dashboard Example */}
        <Section 
          title="Dashboard Completa (Example)" 
          subtitle="Esempio di dashboard reale assemblata con i componenti"
        >
          <div className="border-2 border-[#2A2B2E] rounded-lg overflow-hidden">
            <div className="flex h-[700px]">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                  title="Dashboard"
                  subtitle="Panoramica globale"
                  action={
                    <div className="flex gap-2">
                      <Button variant="minimal" size="sm">
                        <Download size={16} />
                        Esporta
                      </Button>
                      <Button variant="primary" size="sm">
                        <Plus size={16} />
                        Nuovo Tenant
                      </Button>
                    </div>
                  }
                />
                <PageContainer>
                  <div className="space-y-6">
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-4">
                      <KPICard 
                        title="Tenants Attivi"
                        value="127"
                        change={{ value: 12.5, isPositive: true }}
                        chartData={[45, 52, 48, 61, 58, 67, 71, 69, 75, 72, 78, 84]}
                      />
                      <KPICard 
                        title="Revenue Mensile"
                        value="€ 45,320"
                        change={{ value: 8.2, isPositive: true }}
                        chartData={[30, 35, 40, 38, 45, 50, 48, 55, 58, 60, 62, 65]}
                      />
                      <KPICard 
                        title="Nuovi Utenti"
                        value="1,247"
                        change={{ value: 15.3, isPositive: true }}
                        chartData={[100, 110, 105, 125, 130, 140, 138, 150, 155, 160, 165, 175]}
                      />
                    </div>

                    {/* Tenants Table */}
                    <SectionCard 
                      title="Tenants Recenti"
                      subtitle="Ultimi tenant creati sulla piattaforma"
                      action={
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Cerca tenant..." 
                            className="w-64"
                          />
                        </div>
                      }
                    >
                      <Table 
                        columns={[
                          { header: 'Tenant', accessor: 'name' },
                          { header: 'Piano', accessor: 'plan' },
                          { 
                            header: 'Status', 
                            accessor: 'status',
                            cell: (value) => <StatusPill status={value} label={value === 'active' ? 'Attivo' : 'Inattivo'} />
                          },
                          { header: 'Utenti', accessor: 'users' },
                          { header: 'MRR', accessor: 'mrr' }
                        ]}
                        data={[
                          { id: 1, name: 'Acme Corp', plan: 'Enterprise', status: 'active', users: 145, mrr: '€ 2,499' },
                          { id: 2, name: 'TechStart SRL', plan: 'Professional', status: 'active', users: 42, mrr: '€ 499' },
                          { id: 3, name: 'Digital Agency', plan: 'Basic', status: 'active', users: 12, mrr: '€ 99' }
                        ]}
                      />
                    </SectionCard>
                  </div>
                </PageContainer>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="border-t border-[#2A2B2E] pt-8 pb-4">
          <Text className="text-center text-[#6B6B6B]">
            Design System & Component Library v1.0 — Multi-Tenant SaaS Platform
          </Text>
        </div>

      </div>
    </div>
  );
}

// Section Wrapper Component
export function Section({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle?: string; 
  children: React.ReactNode 
}) {
  return (
    <section className="space-y-4">
      <div className="border-b border-[#2A2B2E] pb-3">
        <H2>{title}</H2>
        {subtitle && (
          <Text className="text-[#6B6B6B] mt-1">{subtitle}</Text>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}
