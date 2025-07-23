import { useNavigation } from 'react-router-dom';

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button type="submit" className="btn btn-block" disabled={isSubmitting}>
      {isSubmitting ? 'submitting...' : label}
    </button>
  );
};

export default SubmitButton;
