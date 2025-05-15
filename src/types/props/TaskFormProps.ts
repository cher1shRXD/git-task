export interface TaskFormProps {
  selectedGroup: string;
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOrUpdate: () => void;
  handleAddGroup: (name: string) => void;
}