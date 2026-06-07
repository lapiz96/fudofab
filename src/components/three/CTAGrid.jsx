import { memo } from 'react';

function CTAGrid() {
  return (
    <gridHelper args={[20, 20, '#4169E1', '#E8EFFE']} rotation={[-0.4, 0, 0]} />
  );
}

export default memo(CTAGrid);
