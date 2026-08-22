import { getStackTrace } from './stack-trace';

export const unreachable = () => console.error('Unreachable!\nStack trace:', getStackTrace());
