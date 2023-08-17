export interface ChatInputProps {
    onSend: (message: string) => void;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}