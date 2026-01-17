import React from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import AccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function UiAccordion(props: AccordionProps) {
  return <Accordion {...props} />;
}

export function UiAccordionSummary({ children, ...props }: AccordionSummaryProps) {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />} {...props}>
      {children}
    </AccordionSummary>
  );
}

export function UiAccordionDetails(props: AccordionDetailsProps) {
  return <AccordionDetails {...props} />;
}
