import { z } from "zod";
import { transactionSchema } from "./schemas";

interface CardInfo {
  title: string;
  btnText: string;
  op: 'resetBalance' | 'addIncome' | 'addExpense';
  amt: number;
}

// Define the FormData type based on the schema
type FormData = z.infer<typeof transactionSchema>;

// Extend FormData to include the 'type' field
interface ExtendedFormData extends FormData {
  type: 'income' | 'expense';
}

// Define the payload structure
interface PayloadType {
  data: ExtendedFormData;
}

type TransactionTypes = "income" | "expense" | "reset" | null;


interface ConfirmationModalProps {
  title: string;
  setIsOpen: Dispatch<SetStateAction<TransactionTypes>>;
  resetBalance: () => void;
}

interface CardProps {
  title: string,
  btnText: string,
  amt: number,
  operation: () => void;
}

interface LoginFormProps {
  submitValue: () => void;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
}

interface ModalProps {
  children: React.ReactNode;
  open: boolean
  setIsOpen: Dispatch<SetStateAction<TransactionTypes>>;
  reset: () => void
}

interface ModalManagerProps {
  isModalOpen: TransactionTypes | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<TransactionTypes | null>>;
  incomeOptions: { income: string[], expense: string[] };
  register: UseFormRegister<FormData>;
  errors: FieldErrors<{
    name: string;
    amount: string;
    date: string;
    type: string;
  }>;
  submitValue: () => void;
  reset: () => void;
  resetBalance: () => void;
}

interface AuthRouteProps {
  children: React.ReactElement;
}


interface RegisterFormProps {
  submitValue: () => void;
  register: UseFormRegister<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  errors: FieldErrors<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}

interface TransTitle {
  title: string;
  options: string[];
  setIsOpen: Dispatch<SetStateAction<TransactionTypes>>
  submitValue: () => void;
  reset: () => void;
  register: UseFormRegister<FormData>
  errors: FieldErrors<{
    name: string;
    amount: string;
    date: string;
    tag: string;
  }>;
}

interface Transaction {
  date: string;
  amount: number;
  type: 'income' | 'expense';
  tag: string;
  name: string;
};

type TransactionsType = {
  transactions: Transaction[];
};
