type ErrorTextProps = {
  error?: string[];
};

export function ErrorText({ error }: ErrorTextProps) {
  if (!error || error.length === 0) return null;

  return (
    <p className="text-red-500 text-sm mt-1">
      {error[0]}
    </p>
  );
}