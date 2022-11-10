import { styled } from "styles";

export const Container = styled('button', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: 56,
  width: 56,
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',

  div: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    height: 32,
    width: 32,
    border: '1px solid $gray900',
    borderRadius: 16,
    backgroundColor: '$green500',
    fontSize: '$md',
    color: '$white',
    top: 0,
    transform: 'translate(100%, -25%)'
  },

  variants: {
    color: {
      green: {
        backgroundColor: '$green500'
      },
      gray: {
        backgroundColor: '$gray800'
      },
    },
  },
});