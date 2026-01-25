# UI-MUI Component Library

This directory contains a set of clean wrapper components around Material UI.
These wrappers allow for centralized control over component behavior and future-proofing the application.

## Components List

### Layout & Surface
- **UiCard**: Wrapper for `Card`, `CardContent`, `CardHeader`, `CardActions`. Use for content containers.
- **UiGrid**: Wrapper for MUI Grid v2. Use for responsive layouts.
- **UiStack**: Wrapper for `Stack`. Use for one-dimensional layouts (horizontal/vertical).
- **UiDivider**: Wrapper for `Divider`.
- **UiDrawer**: Wrapper for `Drawer` (sidebars).
- **UiAccordion**: Wrapper for `Accordion`, `AccordionSummary`, `AccordionDetails`.
- **UiTable**: Set of wrappers for Table components (`UiTable`, `UiTableBody`, `UiTableRow`, `UiTableCell`, etc.).

### Inputs & Forms
- **UiButton**: Wrapper for `Button`. Includes `loading` prop for spinner.
- **UiInput**: Wrapper for `TextField`. 
- **UiSelect**: Wrapper for `Select` (includes `FormControl` and `InputLabel`).
- **UiCheckbox**: Wrapper for `Checkbox`. Support optional `label`.
- **UiSwitch**: Wrapper for `Switch`. Support optional `label`.
- **UiSlider**: Wrapper for `Slider`.

### Navigation
- **UiTabs**: Wrapper for `Tabs` and `UiTab` for `Tab`.
- **UiBreadcrumbs**: Wrapper for `Breadcrumbs`.
- **UiPagination**: Wrapper for `Pagination`.
- **UiMenu**: Wrapper for `Menu` and `MenuItem`.

### Feedback & Overlay
- **UiDialog**: Wrapper for `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`.
- **UiAlert**: Wrapper for `Alert`.
- **UiSnackbar**: Wrapper for `Snackbar`.
- **UiTooltip**: Wrapper for `Tooltip`.
- **UiSkeleton**: Wrapper for `Skeleton` loading states.
- **UiLinearProgress**: Wrapper for `LinearProgress`.
- **UiBadge**: Wrapper for `Badge` (notification counts).

### Data Display
- **UiAvatar**: Wrapper for `Avatar`.
- **UiChip**: Wrapper for `Chip`.
- **UiTypography**: Wrapper for `Typography`.

## Usage Example

```tsx
import { UiButton, UiStack, UiTypography } from '@/components/ui-mui/UiStack';

export function MyComponent() {
  return (
    <UiStack spacing={2}>
       <UiTypography variant="h4">Hello World</UiTypography>
       <UiButton variant="contained">Click Me</UiButton>
    </UiStack>
  )
}
```
