import {
  Layer,
  Stack,
  IStackStyles,
  getTheme,
  Image,
  IImageProps,
  ImageFit,
  IStackTokens,
  Text,
  mergeStyles,
  SearchBox,
  ISearchBoxStyles,
} from '@fluentui/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from '../i18n'

const theme = getTheme()
const headerStackStyle: IStackStyles = {
  root: {
    background: theme.palette.themePrimary,
    height: '20vh',
  },
}

const titleToken: IStackTokens = {
  childrenGap: '10%',
  padding: '10%',
}
const imgProps: IImageProps = {
  src: '../public/main.png',
  alt: 'Logo of sunshine connected',
  width: '8vh',
  height: '8vh',
  imageFit: ImageFit.centerCover,
}
const titleClass = mergeStyles([
  {
    color: theme.palette.accent,
  },
])
const Header: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Layer>
      <Stack
        horizontal
        disableShrink
        verticalAlign="center"
        styles={headerStackStyle}
      >
        <Stack
          horizontal
          disableShrink
          verticalAlign="center"
          tokens={titleToken}
          horizontalAlign="space-between"
        >
          <Link href="">
            <Image {...imgProps} />
          </Link>
          <Text variant="large" className={titleClass}>
            Sunshine Connected
          </Text>
        </Stack>
        <Stack grow>
          <Search />
        </Stack>
        <Stack>
          <FontAwesomeIcon
            icon={['fas', 'language']}
            style={{ width: '5vh' }}
          />
          {t('Languages')}
        </Stack>
      </Stack>
    </Layer>
  )
}

const searchBoxStyle: Partial<ISearchBoxStyles> = {
  root: {
    borderRadius: 5,
    width: '40vw',
    selectors: {
      ':hover': {
        borderColor: theme.palette.themePrimary,
      },
    },
  },
}
export const Search: React.FC = () => {
  return (
    <SearchBox
      placeholder="Seach Videos or Volunteers"
      styles={searchBoxStyle}
    />
  )
}

export default Header
