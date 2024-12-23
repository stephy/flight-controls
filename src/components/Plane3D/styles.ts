import { css } from 'glamor';

export const styles = {
  container: css({
    position: 'relative',
    width: '100%',
    height: '500px',
  }),
  mainCanvas: css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#1a1a1a',
  }),
  yokeView: css({
    position: 'absolute',
    top: '10px',
    left: '10px',
    width: '200px',
    height: '200px',
    background: '#2a2a2a',
    borderRadius: '10px',
    border: '2px solid #3a3a3a',
    overflow: 'hidden',
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing',
    },
  }),
  rudderView: css({
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    width: '200px',
    height: '150px',
    background: '#2a2a2a',
    borderRadius: '10px',
    border: '2px solid #3a3a3a',
    overflow: 'hidden',
  }),
  controls: css({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '10px',
    background: '#2a2a2a',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
  }),
};