import { INTRO_PROPOSALS, type IntroProposal } from './intro-proposals.ts';

// Approved: Hielo fluido, Actual choreography, Ajustado audio.
const selected = INTRO_PROPOSALS.find((proposal) => proposal.id === 'ice4');
if (!selected) throw new Error('Falta la bienvenida aprobada de LIF.');

export const HOME_INTRO: IntroProposal = selected;
export const HOME_INTRO_AUDIO = '/audio/lif-welcome-ice4.wav';
export const HOME_INTRO_TRAVEL_MS = 520;
