import { AlignLeft, AlignJustify, Image } from 'react-feather'

export default [
  {
    id: 'categories',
    title: 'Categories',
    icon: <AlignJustify size={20} />,
    navLink: '/categories'
  },
  {
    id: 'sub-categories',
    title: 'Sub Categories',
    icon: <AlignLeft size={20} />,
    navLink: '/sub-categories'
  },
  {
    id: 'wallpapers',
    title: 'Wallpapers',
    icon: <Image size={20} />,
    navLink: '/wallpapers'
  }
]
