import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Save, X, Filter, UserPlus, Building2, Trash2, Users2, Settings } from 'lucide-react';

interface Resource {
  id: string;
  fullName: string;
  stream: string;
  role: string;
  project1: string;
  project2: string;
  project3: string;
  [key: string]: any;
}

interface ColumnConfig {
  key: string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
}

const ResourceDashboard: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'stream', label: 'Stream', type: 'select', options: [] },
    { key: 'role', label: 'Role', type: 'text' },
    { key: 'project1', label: 'Project 1', type: 'text' },
    { key: 'project2', label: 'Project 2', type: 'text' },
    { key: 'project3', label: 'Project 3', type: 'text' }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Resource | null>(null);
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [headerEditValue, setHeaderEditValue] = useState('');
  
  // Multiple filters
  const [filters, setFilters] = useState({
    fullName: '',
    stream: '',
    role: '',
    project: ''
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'text' | 'select'>('text');
  const [newResource, setNewResource] = useState<Partial<Resource>>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedResources = localStorage.getItem('resources');
    const savedColumns = localStorage.getItem('resourceColumns');
    
    if (savedResources) {
      try {
        setResources(JSON.parse(savedResources));
      } catch (error) {
        console.error('Error parsing saved resources:', error);
        // Set default data if parsing fails
        const defaultResources = [
    { id: '1', fullName: 'Abdul Nawaz MD', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '' },
    { id: '2', fullName: 'Alveena Joyce', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '3', fullName: 'Ambarish Srinivasan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '4', fullName: 'AnandhKumar Muthukumar', stream: 'Engineering', role: 'Test Engineer', project1: '', project2: '', project3: '' },
    { id: '5', fullName: 'Anbu Sampath', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '6', fullName: 'Anirudh S', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '7', fullName: 'Anirudh Sudeendran', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '8', fullName: 'Aravind Mohan', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '' },
    { id: '9', fullName: 'Arun Changotra', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '10', fullName: 'Ashutosh Anand', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '' },
    { id: '11', fullName: 'Ashvath Narayanan', stream: 'Engineering', role: 'Associate Data Scientist', project1: '', project2: '', project3: '' },
    { id: '12', fullName: 'Aswin Kumar K G', stream: 'Engineering', role: 'DevOps Engineer', project1: '', project2: '', project3: '' },
    { id: '13', fullName: 'Babu Christopher Donbosco', stream: 'Operations', role: 'General Office Administration', project1: '', project2: '', project3: '' },
    { id: '14', fullName: 'Boobalamurugan', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '15', fullName: 'Bharathwaj Gopalan', stream: 'Finance', role: 'Finance', project1: '', project2: '', project3: '' },
    { id: '16', fullName: 'Chakradhar Yerranagari', stream: 'Finance', role: 'Accounting', project1: '', project2: '', project3: '' },
    { id: '17', fullName: 'Chinmoy Rajurkar', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '' },
    { id: '18', fullName: 'Dhanushya Shankar', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '' },
    { id: '19', fullName: 'Dilip Kumar Rajendhiran', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '20', fullName: 'Ellakkiaa S', stream: 'Engineering', role: 'Associate Data Scientist', project1: '', project2: '', project3: '' },
    { id: '21', fullName: 'Gali Poojitha', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '22', fullName: 'Gomathi S', stream: 'People', role: 'Talent Mgmt. & Engagement', project1: '', project2: '', project3: '' },
    { id: '23', fullName: 'Grace Lee Hui Min', stream: 'Operations', role: 'General Office Administration', project1: '', project2: '', project3: '' },
    { id: '24', fullName: 'Harish Jayakumar', stream: 'Project Management', role: 'Business Analyst', project1: '', project2: '', project3: '' },
    { id: '25', fullName: 'Hariharasudhan S', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '26', fullName: 'Indukuru Sai Tharun Reddy', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '' },
    { id: '27', fullName: 'Iyyappan S', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '28', fullName: 'James Victor Francis', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '29', fullName: 'Jayaprakash Sundaramurthy', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '30', fullName: 'Joshua Lucas', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '' },
    { id: '31', fullName: 'Jyotsna Singh', stream: 'Sales', role: 'Partnerships - Bazaar', project1: '', project2: '', project3: '' },
    { id: '32', fullName: 'Karanveer Singh Bakshi', stream: 'Sales', role: 'Sales', project1: '', project2: '', project3: '' },
    { id: '33', fullName: 'Karthikeyan N', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '' },
    { id: '34', fullName: 'Karunamoorthi Sakthivel', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '35', fullName: 'Kathiravan M', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '36', fullName: 'Kuldeep Gujar', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '37', fullName: 'Maadhusri Ulaganathan', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '38', fullName: 'Madasamy M', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '39', fullName: 'Meenakshi Priyadharshini B', stream: 'People', role: 'Talent Acquisition', project1: '', project2: '', project3: '' },
    { id: '40', fullName: 'Meghana Jagadish Upasani', stream: 'Operations', role: 'Legal', project1: '', project2: '', project3: '' },
    { id: '41', fullName: 'Naveenkumar Sivaprakasam', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '42', fullName: 'Mithuna Jogan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '43', fullName: 'Parkhiya Dixitkumar Arvindbhai', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '44', fullName: 'Prajjwal Kumar', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '45', fullName: 'Praveen Selvaraj', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '46', fullName: 'Priyadharsshni S', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '47', fullName: 'Priyanshu Mishra', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '' },
    { id: '48', fullName: 'Ragunath Venkatraman', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '49', fullName: 'Rai Pramanik', stream: 'People', role: 'Talent Mgmt. & Engagement', project1: '', project2: '', project3: '' },
    { id: '50', fullName: 'Ravi Sundar', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '51', fullName: 'Rooban Chakravarthy', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '52', fullName: 'Sandeep Guruvindapalli', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '' },
    { id: '53', fullName: 'Sangeetha Thangaraj', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '' },
    { id: '54', fullName: 'Sanjana Krishnan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '55', fullName: 'Saran Kumar', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '' },
    { id: '56', fullName: 'Saravanan R', stream: 'IT', role: 'General IT Infrastructure Systems Administration', project1: '', project2: '', project3: '' },
    { id: '57', fullName: 'Satheesh Kumar Hari', stream: 'IT', role: 'General IT Infrastructure Systems Administration', project1: '', project2: '', project3: '' },
    { id: '58', fullName: 'Sethu Ramalingam', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '' },
    { id: '59', fullName: 'Shad Perwez', stream: 'Data Science & Analytics', role: 'ML Ops Engineer', project1: '', project2: '', project3: '' },
    { id: '60', fullName: 'Shankar Ganesh', stream: 'Project Management', role: 'Delivery Management', project1: '', project2: '', project3: '' },
    { id: '61', fullName: 'Shilpa Sudarsanakumar', stream: 'Project Management', role: 'Business Analyst', project1: '', project2: '', project3: '' },
    { id: '62', fullName: 'Shipra Paul', stream: 'Operations', role: 'General Regulatory Affairs', project1: '', project2: '', project3: '' },
    { id: '63', fullName: 'Shriram Suresh Kumar', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '64', fullName: 'Siranjeevi Shanmugam', stream: 'Engineering', role: 'Test Engineer', project1: '', project2: '', project3: '' },
    { id: '65', fullName: 'Sivaseelan G', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '66', fullName: 'Smrithi Sundar', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '67', fullName: 'Sri Bharathan', stream: 'Project Management', role: 'Delivery Management', project1: '', project2: '', project3: '' },
    { id: '68', fullName: 'Srinivas Puniyakoti', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '69', fullName: 'Srinivasan D', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '' },
    { id: '70', fullName: 'Subramani Srinivasan', stream: 'Finance', role: 'Accounting', project1: '', project2: '', project3: '' },
    { id: '71', fullName: 'Sujee Shalini', stream: 'People', role: 'Talent Acquisition', project1: '', project2: '', project3: '' },
    { id: '72', fullName: 'Suraj Kesavan', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '' },
    { id: '73', fullName: 'Suresh V Shankar', stream: 'Founder', role: 'Executive', project1: '', project2: '', project3: '' },
    { id: '74', fullName: 'Tejeswini Kashyappan', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '' },
    { id: '75', fullName: 'Thaanish Ahamed', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '' },
    { id: '76', fullName: 'Thahazeef Ali', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '' },
    { id: '77', fullName: 'Tiyasa Saha', stream: 'Pre-Sales', role: 'Sales Engineer', project1: '', project2: '', project3: '' },
    { id: '78', fullName: 'Vignesh G', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '' },
    { id: '79', fullName: 'Vinayak Ganapuram', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '80', fullName: 'Vinodh Rajamohan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '81', fullName: 'Vishnu C Bhattatherypad', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '' },
    { id: '82', fullName: 'Vishnupriya Jeevanram', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '' },
    { id: '83', fullName: 'Vivek Muraleedharan', stream: 'Engineering', role: 'Data Scientist', project1: '', project2: '', project3: '' }
        ];
        setResources(defaultResources);
        localStorage.setItem('resources', JSON.stringify(defaultResources));
      }
    } else {
      // Default data
      const defaultResources = [
    { id: '1', fullName: 'Abdul Nawaz MD', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '' },
    { id: '2', fullName: 'Alveena Joyce', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '3', fullName: 'Ambarish Srinivasan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '' },
    { id: '4', fullName: 'AnandhKumar Muthukumar', stream: 'Engineering', role: 'Test Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '5', fullName: 'Anbu Sampath', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '6', fullName: 'Anirudh S', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '7', fullName: 'Anirudh Sudeendran', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '8', fullName: 'Aravind Mohan', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '9', fullName: 'Arun Changotra', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: true },
    { id: '10', fullName: 'Ashutosh Anand', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '11', fullName: 'Ashvath Narayanan', stream: 'Engineering', role: 'Associate Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '12', fullName: 'Aswin Kumar K G', stream: 'Engineering', role: 'DevOps Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '13', fullName: 'Babu Christopher Donbosco', stream: 'Operations', role: 'General Office Administration', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '14', fullName: 'Boobalamurugan', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '15', fullName: 'Bharathwaj Gopalan', stream: 'Finance', role: 'Finance', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '16', fullName: 'Chakradhar Yerranagari', stream: 'Finance', role: 'Accounting', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '17', fullName: 'Chinmoy Rajurkar', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '', isDeployed: true },
    { id: '18', fullName: 'Dhanushya Shankar', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '19', fullName: 'Dilip Kumar Rajendhiran', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '20', fullName: 'Ellakkiaa S', stream: 'Engineering', role: 'Associate Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '21', fullName: 'Gali Poojitha', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '22', fullName: 'Gomathi S', stream: 'People', role: 'Talent Mgmt. & Engagement', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '23', fullName: 'Grace Lee Hui Min', stream: 'Operations', role: 'General Office Administration', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '24', fullName: 'Harish Jayakumar', stream: 'Project Management', role: 'Business Analyst', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '25', fullName: 'Hariharasudhan S', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '26', fullName: 'Indukuru Sai Tharun Reddy', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '27', fullName: 'Iyyappan S', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '28', fullName: 'James Victor Francis', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '29', fullName: 'Jayaprakash Sundaramurthy', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '30', fullName: 'Joshua Lucas', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '31', fullName: 'Jyotsna Singh', stream: 'Sales', role: 'Partnerships - Bazaar', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '32', fullName: 'Karanveer Singh Bakshi', stream: 'Sales', role: 'Sales', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '33', fullName: 'Karthikeyan N', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '34', fullName: 'Karunamoorthi Sakthivel', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '35', fullName: 'Kathiravan M', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '36', fullName: 'Kuldeep Gujar', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '37', fullName: 'Maadhusri Ulaganathan', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '38', fullName: 'Madasamy M', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '39', fullName: 'Meenakshi Priyadharshini B', stream: 'People', role: 'Talent Acquisition', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '40', fullName: 'Meghana Jagadish Upasani', stream: 'Operations', role: 'Legal', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '41', fullName: 'Naveenkumar Sivaprakasam', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '42', fullName: 'Mithuna Jogan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '43', fullName: 'Parkhiya Dixitkumar Arvindbhai', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '44', fullName: 'Prajjwal Kumar', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '45', fullName: 'Praveen Selvaraj', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '46', fullName: 'Priyadharsshni S', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '47', fullName: 'Priyanshu Mishra', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '48', fullName: 'Ragunath Venkatraman', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '49', fullName: 'Rai Pramanik', stream: 'People', role: 'Talent Mgmt. & Engagement', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '50', fullName: 'Ravi Sundar', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '51', fullName: 'Rooban Chakravarthy', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '52', fullName: 'Sandeep Guruvindapalli', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '53', fullName: 'Sangeetha Thangaraj', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '54', fullName: 'Sanjana Krishnan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '55', fullName: 'Saran Kumar', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '56', fullName: 'Saravanan R', stream: 'IT', role: 'General IT Infrastructure Systems Administration', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '57', fullName: 'Satheesh Kumar Hari', stream: 'IT', role: 'General IT Infrastructure Systems Administration', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '58', fullName: 'Sethu Ramalingam', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '59', fullName: 'Shad Perwez', stream: 'Data Science & Analytics', role: 'ML Ops Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '60', fullName: 'Shankar Ganesh', stream: 'Project Management', role: 'Delivery Management', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '61', fullName: 'Shilpa Sudarsanakumar', stream: 'Project Management', role: 'Business Analyst', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '62', fullName: 'Shipra Paul', stream: 'Operations', role: 'General Regulatory Affairs', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '63', fullName: 'Shriram Suresh Kumar', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '64', fullName: 'Siranjeevi Shanmugam', stream: 'Engineering', role: 'Test Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '65', fullName: 'Sivaseelan G', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '66', fullName: 'Smrithi Sundar', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '67', fullName: 'Sri Bharathan', stream: 'Project Management', role: 'Delivery Management', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '68', fullName: 'Srinivas Puniyakoti', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '69', fullName: 'Srinivasan D', stream: 'Product Management', role: 'User Experience (UX) Design', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '70', fullName: 'Subramani Srinivasan', stream: 'Finance', role: 'Accounting', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '71', fullName: 'Sujee Shalini', stream: 'People', role: 'Talent Acquisition', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '72', fullName: 'Suraj Kesavan', stream: 'Data Science & Analytics', role: 'Data Scientist', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '73', fullName: 'Suresh V Shankar', stream: 'Founder', role: 'Executive', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '74', fullName: 'Tejeswini Kashyappan', stream: 'Product Management', role: 'Product Manager', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '75', fullName: 'Thaanish Ahamed', stream: 'Data Science & Analytics', role: 'DE / DS', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '76', fullName: 'Thahazeef Ali', stream: 'Engineering', role: 'UI Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '77', fullName: 'Tiyasa Saha', stream: 'Pre-Sales', role: 'Sales Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '78', fullName: 'Vignesh G', stream: 'Data Science & Analytics', role: 'Customer Scientist', project1: '', project2: '', project3: '', isDeployed: true },
    { id: '79', fullName: 'Vinayak Ganapuram', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '80', fullName: 'Vinodh Rajamohan', stream: 'Engineering', role: 'Data Engineer', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '81', fullName: 'Vishnu C Bhattatherypad', stream: 'Customer Success', role: 'Customer Success', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '82', fullName: 'Vishnupriya Jeevanram', stream: 'Engineering', role: 'Software Development', project1: '', project2: '', project3: '', isDeployed: false },
    { id: '83', fullName: 'Vivek Muraleedharan', stream: 'Engineering', role: 'Data Scientist', project1: '', project2: '', project3: '' }
      ];
      setResources(defaultResources);
      localStorage.setItem('resources', JSON.stringify(defaultResources));
    }
    
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch (error) {
        console.error('Error parsing saved columns:', error);
        localStorage.setItem('resourceColumns', JSON.stringify(columns));
      }
    } else {
      localStorage.setItem('resourceColumns', JSON.stringify(columns));
    }
  }, []);

  // Save data to localStorage whenever resources or columns change
  useEffect(() => {
    if (resources.length > 0) {
      localStorage.setItem('resources', JSON.stringify(resources));
    }
  }, [resources]);

  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem('resourceColumns', JSON.stringify(columns));
    }
  }, [columns]);

  // Update stream options when resources change
  useEffect(() => {
    const streams = Array.from(new Set(resources.map(r => r.stream).filter(Boolean)));
    setColumns(prev => prev.map(col => 
      col.key === 'stream' ? { ...col, options: streams } : col
    ));
  }, [resources]);

  // List of deployed resources (exact names as specified)
  const deployedResources = [
    'Ambarish Srinivasan',
    'Anirudh Sudeendran', 
    'Dilip Kumar Rajendhiran',
    'James Victor Francis',
    'Prajjwal Kumar',
    'Sandeep Guruvindapalli',
    'Sethu Ramalingam',
    'Srinivas Puniyakoti',
    'Vinodh Rajamohan',
    'Vivek Muraleedharan'
  ];

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setEditForm({ ...resource });
  };

  const handleSave = () => {
    if (editForm) {
      const updatedResources = resources.map(resource => 
        resource.id === editForm.id ? editForm : resource
      );
      setResources(updatedResources);
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleHeaderEdit = (columnKey: string, currentLabel: string) => {
    setEditingHeader(columnKey);
    setHeaderEditValue(currentLabel);
  };

  const handleHeaderSave = (columnKey: string) => {
    const updatedColumns = columns.map(col => 
      col.key === columnKey ? { ...col, label: headerEditValue } : col
    );
    setColumns(updatedColumns);
    localStorage.setItem('resourceColumns', JSON.stringify(updatedColumns));
    setEditingHeader(null);
    setHeaderEditValue('');
  };

  const handleHeaderDelete = (columnKey: string) => {
    if (window.confirm('Are you sure you want to delete this column? This will remove all data in this column.')) {
      const updatedColumns = columns.filter(col => col.key !== columnKey);
      setColumns(updatedColumns);
      
      // Remove the column data from all resources
      const updatedResources = resources.map(resource => {
        const { [columnKey]: removed, ...rest } = resource;
        return rest;
      });
      setResources(updatedResources);
      
      localStorage.setItem('resourceColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('resources', JSON.stringify(updatedResources));
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: ColumnConfig = {
        key: newColumnName.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnName,
        type: newColumnType,
        options: newColumnType === 'select' ? [] : undefined
      };
      const updatedColumns = [...columns, newColumn];
      setColumns(updatedColumns);
      
      // Add empty values for existing resources
      const updatedResources = resources.map(resource => ({
        ...resource,
        [newColumn.key]: ''
      }));
      setResources(updatedResources);
      
      localStorage.setItem('resourceColumns', JSON.stringify(updatedColumns));
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      
      setNewColumnName('');
      setNewColumnType('text');
      setShowAddColumnForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updatedResources = resources.filter(resource => resource.id !== id);
      setResources(updatedResources);
      localStorage.setItem('resources', JSON.stringify(updatedResources));
    }
  };

  const handleAddResource = () => {
    const hasRequiredFields = columns.some(col => newResource[col.key]);
    if (hasRequiredFields) {
      const resource: Resource = {
        id: Date.now().toString(),
        ...columns.reduce((acc, col) => ({
          ...acc,
          [col.key]: newResource[col.key] || ''
        }), {})
      };
      const updatedResources = [...resources, resource];
      setResources(updatedResources);
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      setNewResource({});
      setShowAddForm(false);
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const filteredResources = resources.filter(resource => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === '') return true;
      if (key === 'project') {
        return resource.project1?.toLowerCase().includes(value.toLowerCase()) ||
               resource.project2?.toLowerCase().includes(value.toLowerCase()) ||
               resource.project3?.toLowerCase().includes(value.toLowerCase());
      }
      return String(resource[key] || '').toLowerCase().includes(value.toLowerCase());
    });
  });

  const isDeployed = (fullName: string) => {
    return deployedResources.includes(fullName);
  };

  const getStreamColor = (stream: string) => {
    const colors = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Data Science & Analytics': 'bg-purple-100 text-purple-800',
      'Product Management': 'bg-green-100 text-green-800',
      'Customer Success': 'bg-yellow-100 text-yellow-800',
      'Operations': 'bg-gray-100 text-gray-800',
      'Finance': 'bg-orange-100 text-orange-800',
      'People': 'bg-pink-100 text-pink-800',
      'Project Management': 'bg-indigo-100 text-indigo-800',
      'IT': 'bg-teal-100 text-teal-800',
      'Sales': 'bg-red-100 text-red-800',
      'Pre-Sales': 'bg-cyan-100 text-cyan-800',
      'Founder': 'bg-emerald-100 text-emerald-800'
    };
    return colors[stream as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderCell = (resource: Resource, column: ColumnConfig) => {
    if (editingId === resource.id) {
      if (column.type === 'select' && column.options) {
        return (
          <select
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select {column.label}</option>
            {column.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      } else {
        return (
          <input
            type="text"
            value={editForm?.[column.key] || ''}
            onChange={(e) => setEditForm({ ...editForm!, [column.key]: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        );
      }
    } else {
      const value = resource[column.key];
      if (column.key === 'fullName') {
        return (
          <div className={`text-sm font-semibold ${isDeployed(value) ? 'text-amber-700' : 'text-gray-900'}`}>
            {value}
            {isDeployed(value) && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Deployed</span>}
          </div>
        );
      } else if (column.key === 'stream') {
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStreamColor(value)}`}>
            {value}
          </span>
        );
      } else if (column.key === 'role') {
        return <div className="text-sm text-blue-600 font-medium">{value}</div>;
      } else if (column.key.startsWith('project')) {
        return <div className="text-sm text-green-600 font-medium">{value}</div>;
      } else {
        return <div className="text-sm text-gray-600 font-medium">{value}</div>;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
            <Users2 className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Resource Allocation Dashboard
          </h2>
        </div>
        <div className="flex space-x-2">
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(resources, null, 2))}`}
            download="resources.json"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <span>Download Data</span>
          </a>
          <button
            onClick={() => setShowAddColumnForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Add Column</span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Multiple Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-900">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Filter by name..."
            value={filters.fullName}
            onChange={(e) => handleFilterChange('fullName', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <select
            value={filters.stream}
            onChange={(e) => handleFilterChange('stream', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Streams</option>
            {Array.from(new Set(resources.map(r => r.stream).filter(Boolean))).map(stream => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filter by role..."
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Filter by projects..."
            value={filters.project}
            onChange={(e) => handleFilterChange('project', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Add Column Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Resource</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map(column => (
              <div key={column.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{column.label}</label>
                {column.type === 'select' && column.options ? (
                  <select
                    value={newResource[column.key] as string || ''}
                    onChange={(e) => setNewResource({ ...newResource, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Select {column.label}</option>
                    {column.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={newResource[column.key] as string || ''}
                    onChange={(e) => setNewResource({ ...newResource, [column.key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddResource}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Resource
            </button>
          </div>
        </div>
      )}

      {/* Add Column Form */}
      {showAddColumnForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Add New Column</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Name</label>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter column name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column Type</label>
              <select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value as 'text' | 'select')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="text">Text</option>
                <option value="select">Dropdown</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddColumnForm(false)}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddColumn}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Column
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Resource Entries</h3>
          <button
            onClick={() => setShowAddColumnForm(true)}
            className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center space-x-1"
          >
            <Settings className="w-3 h-3" />
            <span>Add Column</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-6 py-4 text-left text-sm font-medium text-gray-900 uppercase tracking-wider">
                    {editingHeader === column.key ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={headerEditValue}
                          onChange={(e) => setHeaderEditValue(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleHeaderSave(column.key)}
                        />
                        <button
                          onClick={() => handleHeaderSave(column.key)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingHeader(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleHeaderDelete(column.key)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => handleHeaderEdit(column.key, column.label)}
                      >
                        <span>{column.label}</span>
                      </div>
                    )}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className={`hover:bg-gray-50 ${isDeployed(resource.fullName) ? 'bg-yellow-50' : ''}`}>
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {renderCell(resource, column)}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingId === resource.id ? (
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 p-1"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResourceDashboard;