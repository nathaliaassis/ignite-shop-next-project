import { styled } from "styles";


export const Container = styled('div', {
  display:  'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const Header = styled('header', {
  display: 'flex',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto 1rem',

  variants: {
    showBagButton: {
      true: {
        justifyContent: 'space-between',
      },
      false: {
        justifyContent: 'center',
      }
    }
  }
});