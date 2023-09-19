import { Button, Flex, Stack } from '@chakra-ui/react';
import { useLocation, useNavigate } from '@remix-run/react';

export function LeftNavigationAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Flex
      direction={'column'}
      h={'100%'}
      justifyContent={'space-between'}
      borderRadius={'15px'}
      boxShadow="base"
      rounded="md"
      bg="white"
    >
      <Stack px={4} py={6}>
        <Button
          justifyContent={'left'}
          // leftIcon={
          //   location.pathname === "/dashboard" ? (
          //     <Image src={HomeFilled} />
          //   ) : (
          //     <Image src={HomeOutline} />
          //   )
          // }
          variant={location.pathname === '/dashboard' ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/dashboard')}
          textColor={location.pathname === '/dashboard' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/dashboard' ? 'bold' : 'semibold'}
        >
          Dashboard
        </Button>

        <Button
          justifyContent={'left'}
          // leftIcon={
          //   location.pathname === "/product" ? (
          //     <Image src={BoxFilled} />
          //   ) : (
          //     <Image src={BoxOutline} />
          //   )
          // }
          variant={location.pathname === '/product' ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/dashboardAdmin')}
          textColor={
            location.pathname === '/dashboardAdmin'
              ? '#0086B4'
              : 'unset' || location.pathname === '/adminRequest'
              ? '#0086B4'
              : 'unset' || location.pathname === '/adminProcessing'
              ? '#0086B4'
              : 'unset' || location.pathname === '/adminSuccess'
              ? '#0086B4'
              : 'unset' || location.pathname === '/adminDeclined'
              ? '#0086B4'
              : 'unset'
          }
          fontWeight={
            location.pathname === '/dashboardAdmin'
              ? 'bold'
              : 'semibold' || location.pathname === '/adminRequest'
              ? 'bold'
              : 'semibold' || location.pathname === '/adminProcessing'
              ? 'bold'
              : 'semibold' || location.pathname === '/adminSuccess'
              ? 'bold'
              : 'semibold' || location.pathname === '/adminDeclined'
              ? 'bold'
              : 'semibold'
          }
        >
          Penarikan Dana
        </Button>
      </Stack>

      <Stack px={4} pb={'7.5vh'}>
        <Button
          justifyContent={'left'}
          // leftIcon={
          //   location.pathname === "/profile" ? (
          //     <Image src={ProfileFilled} />
          //   ) : (
          //     <Image src={ProfileOutline} />
          //   )
          // }
          variant={location.pathname === '/profile' ? 'solid' : 'ghost'}
          py={6}
          onClick={() => navigate('/profile')}
          textColor={location.pathname === '/profile' ? '#0086B4' : 'unset'}
          fontWeight={location.pathname === '/profile' ? 'bold' : 'semibold'}
        >
          Profile
        </Button>
      </Stack>
    </Flex>
  );
}
