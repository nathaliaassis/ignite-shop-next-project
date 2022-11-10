import { styled } from 'styles';


export const Container = styled('div', {
  position: 'fixed',
  right: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100vh',
  width: '25vw',
  zIndex: 5,
  padding: '2rem',
  transition: 'all 0.2s ease-in-out',
  opacity: 0,
  transform: 'translateX(110%)',
  
  h3: {
    marginBottom: '2rem',
  },

  variants: {
    isOpened: {
      true: {
        backgroundColor: '$gray800',
        transform: 'translateX(0)',
        opacity: 1,
      },
    }
  }
});

export const CloseButton = styled('button', {
  width: 'fit-content',
  marginLeft: 'auto',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer'
});

export const Products = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,
});

export const ProductItem = styled('div', {
  display: 'flex',
});

export const ProductImage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 94,
  height: 94,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
});

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  marginLeft: '1rem',
  
  div: {

    display: 'flex',
    flexDirection: 'column',
  },

  span: {
    fontSize: '$md',
    color: '$gray300'
  },

  strong: {
    fontSize: '$md',
    color: '$white'
  },

  button: { 
    marginTop: '1rem',
    fontSize: '$md',
    color: '$green500',
    // fontWeight: 'bold',
    border: 'none',
    background: 'transparent',
    width: 'fit-content',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    }
  },
});

export const Quantity = styled('div', { 
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$md',
  color: '$gray300',
  marginBottom: '1rem',
});

export const Total = styled('div', { 
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '$lg',
  color: '$gray100',

  'strong:last-child': {
    fontSize: '$xl',
  }
});

export const BuyButton = styled('button', {
  backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',
  width: '100%',
  marginTop: '3rem',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  }
});
