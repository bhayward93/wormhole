import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog';

/** Token alert props type. */
type TokenAlertProps = {
  token: string;
  onContinue: () => void;
};

/**
 * Token alert component. Will show an alert displaying the users token.
 * @param { TokenAlertProps } props - props.
 * @returns { JSX.Element } The token alert component.
 */
export function TokenAlert({
  token,
  onContinue,
}: TokenAlertProps): JSX.Element {
  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Success!</AlertDialogTitle>
          <AlertDialogTitle>Please save your access token</AlertDialogTitle>
          <AlertDialogDescription>
            <strong className="break-all">{token}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue} autoFocus={true}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
