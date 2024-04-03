const STATUS_FILTERS = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

const ROLES = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Employee',
    value: 'employee',
  },
];

const DEPARTMENTS = [
  { label: 'Accounting & Finance', value: 'accounting_finance' },
  { label: 'Media Creator', value: 'media_creator' },
  { label: 'Media Editor', value: 'media_editor' },
  { label: 'Client Relationship - Sales', value: 'client_relationship_sales' },
  { label: 'Client Relationship - Deal Management', value: 'client_relationship_deal_management' },
];

export default { ROLES, DEPARTMENTS, STATUS_FILTERS };
