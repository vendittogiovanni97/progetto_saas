"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Tooltip, IconButton, Collapse, Menu, MenuItem } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useSidebar } from "@/providers/SidebarProvider";
import { navLinks } from "@/common/config/navigazioneSidebar";

export default function IndustrialSidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { isCollapsed } = useSidebar();
  const drawerWidth = isCollapsed ? 80 : 256;
  const { toggle } = useSidebar();

  const [openLibrary, setOpenLibrary] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
    if (isCollapsed) {
      setAnchorEl(event.currentTarget);
      setActiveMenu(menuName);
    } else {
      if (menuName === "Library") setOpenLibrary(!openLibrary);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.default',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Brand */}
        <Box sx={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          px: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
            <IconButton 
              onClick={toggle}
              size="small" 
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'white', bgcolor: 'background.paper' }
              }}
            >
              <Box component="span" className="material-symbols-outlined">menu</Box>
            </IconButton>
            {!isCollapsed && (
              <Typography variant="h6" sx={{ 
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                NEXUS_OS
              </Typography>
            )}
          </Box>
        </Box>

        {/* Nav Links */}
        <Box sx={{ flex: 1, overflowY: 'auto', py: 3, px: 2 }}>
          <List sx={{ p: 0, '& > *': { mb: 0.5 } }}>
            {navLinks.map((link) => {
              const hasSubItems = link.subItems && link.subItems.length > 0;
              const isMenuOpen = link.name === "Library" && openLibrary;
              const isActive = pathname === link.href || (hasSubItems && link.subItems?.some(s => pathname === s.href));
              
              const content = (
                <>
                  <ListItemButton
                    onClick={(e) => hasSubItems ? handleMenuClick(e, link.name) : undefined}
                    {...(!hasSubItems ? { component: Link, href: link.href } : {})}
                    sx={{
                      borderRadius: 2,
                      px: isCollapsed ? 1 : 1.5,
                      py: 1.5,
                      mb: 0.5,
                      bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      border: isActive ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : '1px solid transparent',
                      color: isActive ? 'white' : 'text.secondary',
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                      '&:hover': {
                        bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
                        color: 'white',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 0, 
                      mr: isCollapsed ? 0 : 1.5,
                      color: isActive ? 'primary.main' : 'inherit',
                    }}>
                      <Box component="span" className="material-symbols-outlined">{link.icon}</Box>
                    </ListItemIcon>
                    {!isCollapsed && (
                      <>
                        <ListItemText 
                          primary={link.name}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        />
                        {hasSubItems && (
                          <Box component="span" className="material-symbols-outlined" sx={{ 
                            fontSize: 18, 
                            opacity: 0.5,
                            transform: isMenuOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s'
                          }}>
                            expand_more
                          </Box>
                        )}
                      </>
                    )}
                  </ListItemButton>

                  {!isCollapsed && hasSubItems && (
                    <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding sx={{ mb: 1 }}>
                        {link.subItems?.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <ListItemButton
                              key={subItem.name}
                              component={Link}
                              href={subItem.href}
                              sx={{
                                borderRadius: 2,
                                pl: 6.5,
                                pr: 1.5,
                                py: 1,
                                color: isSubActive ? 'white' : 'text.secondary',
                                bgcolor: isSubActive ? alpha(theme.palette.common.white, 0.05) : 'transparent',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.common.white, 0.05),
                                  color: 'white',
                                },
                              }}
                            >
                              <ListItemText 
                                primary={subItem.name}
                                primaryTypographyProps={{
                                  fontSize: '0.8125rem',
                                  fontWeight: isSubActive ? 600 : 400,
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </>
              );

              return isCollapsed ? (
                <Tooltip key={link.name} title={link.name} placement="right">
                  <Box>{content}</Box>
                </Tooltip>
              ) : <Box key={link.name}>{content}</Box>;
            })}
          </List>

          {/* Collapsed Menu Popover */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            slotProps={{
              paper: {
                sx: {
                  bgcolor: 'background.default',
                  border: `1px solid ${theme.palette.divider}`,
                  p: 1,
                  minWidth: 180,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  mx: 1,
                }
              }
            }}
          >
            {navLinks.find(l => l.name === activeMenu)?.subItems?.map((subItem) => (
              <MenuItem
                key={subItem.name}
                component={Link}
                href={subItem.href}
                onClick={handleMenuClose}
                sx={{
                  borderRadius: 1,
                  fontSize: '0.875rem',
                  color: pathname === subItem.href ? 'primary.main' : 'text.secondary',
                  py: 1,
                  '&:hover': {
                    bgcolor: 'background.paper',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 1.5, color: 'inherit' }}>
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>{subItem.icon}</Box>
                </ListItemIcon>
                {subItem.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Tooltip title={isCollapsed ? "Settings" : ""} placement="right">
            <ListItemButton
              component={Link}
              href="/dashboard/settings"
              sx={{
                borderRadius: 2,
                px: isCollapsed ? 1 : 1.5,
                py: 1.5,
                mb: 1,
                color: 'text.secondary',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                '&:hover': {
                  bgcolor: 'background.paper',
                  color: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 1.5 }}>
                <Box component="span" className="material-symbols-outlined">settings</Box>
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText 
                  primary="Settings"
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>

          {/* User Profile */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: isCollapsed ? 0 : 1.5,
            px: isCollapsed ? 0 : 1.5,
            py: 1.5,
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
          }}>
            <Avatar sx={{ width: 32, height: 32 }} />
            {!isCollapsed && (
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="caption" sx={{ 
                  fontWeight: 700, 
                  display: 'block',
                  color: 'white',
                }}>
                  ADMIN_01
                </Typography>
                <Typography variant="caption" sx={{ 
                  fontSize: '0.625rem',
                  color: 'text.secondary',
                }}>
                  ONLINE
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
