import { TbHomeStats } from 'react-icons/tb';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';
import type { ReactElement } from 'react';

export interface NavLinkDetails {
  text: string;
  path: string;
  icon: ReactElement;
}

const links: NavLinkDetails[] = [
  {
    text: 'dashboard',
    path: '.',
    icon: <TbHomeStats />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
