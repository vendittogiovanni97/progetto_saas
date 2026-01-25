'use client';

import React, { useState } from 'react';

// Centralized Import
import { 
  UiButton, 
  UiInput, 
  UiSelect, 
  UiCheckbox, 
  UiSwitch, 
  UiSlider,
  UiCard, UiCardHeader, UiCardContent, UiCardActions,
  UiDialog, UiDialogTitle, UiDialogContent, UiDialogActions,
  UiAlert,
  UiAvatar,
  UiBadge,
  UiChip,
  UiTooltip,
  UiSkeleton,
  UiLinearProgress,
  UiTabs, UiTab,
  UiBreadcrumbs,
  UiPagination,
  UiAccordion, UiAccordionSummary, UiAccordionDetails,
  UiDivider,
  UiStack,
  UiTypography,
  UiTable, UiTableHead, UiTableBody, UiTableRow, UiTableCell, UiTableContainer
} from '@/common/components/ui-mui'; 

// External MUI / Icons imports for demo data
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link'; // Standard MUI Link for navigation example
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box'; // Basic layout utility from MUI
import { Grid } from '@mui/material';

export default function ShowcaseMuiPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', p: 4, pb: 15 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        
        {/* Header */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 4 }}>
          <UiTypography variant="h2" component="h1" fontWeight="bold">
            MUI Components Showcase
          </UiTypography>
          <UiTypography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
             A complete visual reference of all ui-mui components available in the project.
          </UiTypography>
        </Box>

        {/* Layout Components */}
        <ShowcaseSection title="1. Layout & Containers">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <UiCard variant="outlined">
                <UiCardHeader title="UiCard Component" subheader="With Header, Content & Actions" />
                <UiDivider />
                <UiCardContent>
                  <UiTypography variant="body2" color="textSecondary">
                    This is a standard wrapper card. It uses the default MUI styles but can be easily themed.
                  </UiTypography>
                </UiCardContent>
                <UiCardActions>
                  <UiButton size="small">Action 1</UiButton>
                  <UiButton size="small" color="secondary">Action 2</UiButton>
                </UiCardActions>
              </UiCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
               <UiStack spacing={2}>
                 <Box sx={{ p: 2, border: '1px dashed grey', borderRadius: 1 }}>
                    <UiTypography gutterBottom>UiStack (Vertical)</UiTypography>
                    <Box sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', p: 1, borderRadius: 1, mb: 1, textAlign: 'center' }}>Item 1</Box>
                    <Box sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', p: 1, borderRadius: 1, textAlign: 'center' }}>Item 2</Box>
                 </Box>
                 <UiAccordion>
                    <UiAccordionSummary>UiAccordion Example</UiAccordionSummary>
                    <UiAccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </UiAccordionDetails>
                 </UiAccordion>
               </UiStack>
            </Grid>
          </Grid>
        </ShowcaseSection>

        {/* Inputs */}
        <ShowcaseSection title="2. Inputs & Controls">
          <UiStack spacing={4}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              <UiButton variant="contained">Primary Button</UiButton>
              <UiButton variant="outlined">Outlined Button</UiButton>
              <UiButton variant="text">Text Button</UiButton>
              <UiButton variant="contained" loading>Loading</UiButton>
              <UiButton variant="contained" disabled>Disabled</UiButton>
              <UiButton variant="contained" color="error">Error Color</UiButton>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <UiInput label="UiInput (TextField)" placeholder="Type something..." />
              <UiSelect label="UiSelect" defaultValue="1">
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
                <MenuItem value="3">Option 3</MenuItem>
              </UiSelect>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
              <UiCheckbox defaultChecked />
              <UiCheckbox label="With Label" />
              <UiSwitch defaultChecked />
              <UiSwitch label="With Label" />
            </Box>

            <Box sx={{ width: '100%', maxWidth: 400 }}>
               <UiTypography gutterBottom>UiSlider</UiTypography>
               <UiSlider defaultValue={30} />
            </Box>
          </UiStack>
        </ShowcaseSection>

        {/* Feedback */}
        <ShowcaseSection title="3. Feedback & Status">
          <UiStack spacing={3}>
            <UiAlert severity="info">This is a UiAlert - Info</UiAlert>
            <UiAlert severity="success">This is a UiAlert - Success</UiAlert>
            <UiAlert severity="warning">This is a UiAlert - Warning</UiAlert>
            <UiAlert severity="error" title="Error Title">This is a UiAlert - Error with Title</UiAlert>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <UiBadge badgeContent={4} color="primary">
                 <Box sx={{ width: 40, height: 40, bgcolor: 'action.disabledBackground', borderRadius: 1 }} />
              </UiBadge>
              <UiChip label="UiChip" />
              <UiChip label="Deletable" onDelete={() => {}} color="primary" />
              
              <UiTooltip title="I am a tooltip">
                <UiButton variant="outlined" size="small">Hover me (Tooltip)</UiButton>
              </UiTooltip>
            </Box>

            <UiStack spacing={2}>
              <UiTypography variant="caption">UiLinearProgress</UiTypography>
              <UiLinearProgress />
              <UiTypography variant="caption">UiSkeleton</UiTypography>
              <UiSkeleton variant="rectangular" width="100%" height={60} />
            </UiStack>
          </UiStack>
        </ShowcaseSection>

        {/* Data Display */}
        <ShowcaseSection title="4. Data Display">
           <UiStack spacing={4}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                 <UiAvatar alt="Remy Sharp" src="#" />
                 <UiAvatar sx={{ bgcolor: 'warning.main' }}>N</UiAvatar>
              </Box>

              <UiTableContainer>
                <UiTable>
                  <UiTableHead>
                    <UiTableRow>
                      <UiTableCell>ID</UiTableCell>
                      <UiTableCell>Name</UiTableCell>
                      <UiTableCell>Status</UiTableCell>
                      <UiTableCell align="right">Amount</UiTableCell>
                    </UiTableRow>
                  </UiTableHead>
                  <UiTableBody>
                    {[1, 2, 3].map((id) => (
                      <UiTableRow key={id}>
                        <UiTableCell>{id}</UiTableCell>
                        <UiTableCell>Item Name {id}</UiTableCell>
                        <UiTableCell><UiChip size="small" label="Active" color="success" /></UiTableCell>
                        <UiTableCell align="right">$99.00</UiTableCell>
                      </UiTableRow>
                    ))}
                  </UiTableBody>
                </UiTable>
              </UiTableContainer>
           </UiStack>
        </ShowcaseSection>

        {/* Navigation */}
        <ShowcaseSection title="5. Navigation">
           <UiStack spacing={4}>
              <UiBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                 <Link underline="hover" color="inherit" href="/">Home</Link>
                 <Link underline="hover" color="inherit" href="#">Catalog</Link>
                 <UiTypography color="text.primary">Product</UiTypography>
              </UiBreadcrumbs>

              <UiTabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                <UiTab label="Tab One" />
                <UiTab label="Tab Two" />
                <UiTab label="Tab Three" />
              </UiTabs>

              <UiPagination count={10} color="primary" />
           </UiStack>
        </ShowcaseSection>
        
        {/* Interactive Dialog */}
        <ShowcaseSection title="6. Modals">
           <UiButton variant="contained" onClick={() => setModalOpen(true)}>Open Demo Dialog</UiButton>
           <UiDialog open={modalOpen} onClose={() => setModalOpen(false)}>
              <UiDialogTitle>Use Google's location service?</UiDialogTitle>
              <UiDialogContent>
                 <UiTypography>
                    Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                 </UiTypography>
              </UiDialogContent>
              <UiDialogActions>
                 <UiButton onClick={() => setModalOpen(false)}>Disagree</UiButton>
                 <UiButton onClick={() => setModalOpen(false)} autoFocus>Agree</UiButton>
              </UiDialogActions>
           </UiDialog>
        </ShowcaseSection>

        {/* Dashboard Pages Example */}
        <ShowcaseSection title="7. Dashboard Example">
           <UiStack spacing={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Box>
                    <UiTypography variant="h4" fontWeight="bold">Dashboard</UiTypography>
                    <UiTypography color="textSecondary">Welcome back, John Doe</UiTypography>
                 </Box>
                 <UiButton variant="contained" color="primary">Download Report</UiButton>
              </Box>

              <Grid container spacing={3}>
                 {[
                    { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month" },
                    { title: "Subscriptions", value: "+2350", change: "+180.1% from last month" },
                    { title: "Active Now", value: "+573", change: "+201 since last hour" }
                 ].map((stat, i) => (
                    <Grid size={{ xs: 12, md: 4 }} key={i}>
                       <UiCard variant="outlined">
                          <UiCardContent>
                             <UiTypography variant="subtitle2" color="textSecondary">{stat.title}</UiTypography>
                             <UiTypography variant="h4" fontWeight="bold" sx={{ my: 1 }}>{stat.value}</UiTypography>
                             <UiTypography variant="caption" color="textSecondary">{stat.change}</UiTypography>
                          </UiCardContent>
                       </UiCard>
                    </Grid>
                 ))}
              </Grid>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <UiCard variant="outlined" sx={{ height: '100%' }}>
                     <UiCardHeader title="Recent Transactions" />
                     <UiDivider />
                     <UiTableContainer>
                        <UiTable>
                           <UiTableHead>
                              <UiTableRow>
                                 <UiTableCell>Customer</UiTableCell>
                                 <UiTableCell>Status</UiTableCell>
                                 <UiTableCell align="right">Amount</UiTableCell>
                              </UiTableRow>
                           </UiTableHead>
                           <UiTableBody>
                              <UiTableRow>
                                 <UiTableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                       <UiAvatar sx={{ width: 32, height: 32 }} />
                                       <UiTypography variant="body2">Liam Johnson</UiTypography>
                                    </Box>
                                 </UiTableCell>
                                 <UiTableCell><UiChip label="Paid" color="success" size="small" variant="outlined" /></UiTableCell>
                                 <UiTableCell align="right">$250.00</UiTableCell>
                              </UiTableRow>
                              <UiTableRow>
                                 <UiTableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                       <UiAvatar sx={{ width: 32, height: 32 }} />
                                       <UiTypography variant="body2">Olivia Smith</UiTypography>
                                    </Box>
                                 </UiTableCell>
                                 <UiTableCell><UiChip label="Pending" color="warning" size="small" variant="outlined" /></UiTableCell>
                                 <UiTableCell align="right">$150.00</UiTableCell>
                              </UiTableRow>
                              <UiTableRow>
                                 <UiTableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                       <UiAvatar sx={{ width: 32, height: 32 }} />
                                       <UiTypography variant="body2">Noah Williams</UiTypography>
                                    </Box>
                                 </UiTableCell>
                                 <UiTableCell><UiChip label="Failed" color="error" size="small" variant="outlined" /></UiTableCell>
                                 <UiTableCell align="right">$350.00</UiTableCell>
                              </UiTableRow>
                           </UiTableBody>
                        </UiTable>
                     </UiTableContainer>
                  </UiCard>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                   <UiCard variant="outlined" sx={{ height: '100%' }}>
                      <UiCardHeader title="Quick Actions" />
                      <UiDivider />
                      <UiCardContent>
                         <UiStack spacing={2}>
                            <UiButton fullWidth variant="outlined">Create Invoice</UiButton>
                            <UiButton fullWidth variant="outlined">Add Customer</UiButton>
                            <UiButton fullWidth variant="outlined">Export detailed data</UiButton>
                         </UiStack>
                      </UiCardContent>
                   </UiCard>
                </Grid>
              </Grid>
           </UiStack>

        </ShowcaseSection>
      </Box>
    </Box>
  );
}

function ShowcaseSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Box sx={{ p: 4, borderRadius: 2, border: 1, borderColor: 'divider', bgcolor: 'background.paper', boxShadow: 1 }}>
       <UiTypography variant="h5" sx={{ mb: 3, fontWeight: 600, borderBottom: 1, borderColor: 'divider', pb: 1 }}>
         {title}
       </UiTypography>
       {children}
    </Box>
  )
}
