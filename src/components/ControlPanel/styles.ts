import { css } from 'glamor';
import { COLORS } from '../../utils/colors';

const createSlider = (color: string) => css({
  width: '100%',
  height: '20px',
  backgroundColor: '#444',
  borderRadius: '10px',
  appearance: 'none',
  outline: 'none',
  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: color,
    borderRadius: '50%',
    cursor: 'pointer',
    border: '2px solid #fff'
  }
});

export const styles = {
  section: css({
    backgroundColor: '#333',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    '&:last-child': {
      marginBottom: 0
    }
  }),
  sectionTitle: css({
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderBottom: '1px solid #444',
    paddingBottom: '8px'
  }),
  controlGroup: css({
    marginBottom: '15px',
    '&:last-child': {
      marginBottom: 0
    }
  }),
  label: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#aaa'
  }),
  value: css({
    fontWeight: 'bold',
    fontSize: '14px'
  }),
  createSlider,
  flapControl: css({
    position: 'relative',
    paddingBottom: '20px'
  }),
  flapMarks: css({
    position: 'absolute',
    width: '100%',
    bottom: '0',
    left: '0',
    height: '20px'
  }),
  flapMark: css({
    position: 'absolute',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '1px'
  }),
  flapMarkLine: css({
    width: '1px',
    height: '8px',
    backgroundColor: '#666'
  }),
  flapMarkLabel: css({
    color: '#888',
    fontSize: '10px',
    marginTop: '2px'
  }),
  resetButton: css({
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#4B5563',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    ':hover': {
      backgroundColor: '#374151'
    }
  }),
  controlChecked: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#34D399',
    fontSize: '14px',
    marginTop: '10px',
    padding: '8px',
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderRadius: '4px'
  })
};