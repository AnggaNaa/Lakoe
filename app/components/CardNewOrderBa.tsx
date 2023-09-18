import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UseSearch } from '~/hooks/useSearchOrder copy';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';

export default function CardNewOrderBa(props: IOrderDetailInvoice) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { filteredOrders } = UseSearch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBalanceNotif = async () => {
    try {
      const mailerBaseUrl = 'https://connect.mailerlite.com';
      const mailerEndPoint = '/api/subscribers';
      const mailerApiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2E4ZjZkNTMxMDdkY2M1MjZjM2M5YTQxY2JhMjg0ZjJlOTc5NmFjOTA2MjVkMzRjN2I5NTVmNDY1ODlkZjcxOGM5NzY5ZmYyMzU5OTcxZTkiLCJpYXQiOjE2OTQxNTU1NDQuMTI1MzUyLCJuYmYiOjE2OTQxNTU1NDQuMTI1MzU0LCJleHAiOjQ4NDk4MjkxNDQuMTIwNDQsInN1YiI6IjYxNDY4NSIsInNjb3BlcyI6W119.KgsXIIo-rqViucL5U0QTHaG-Nhp0YJn0c752CSW1taUIVgfP0Dyk-vL-mHEGCLWl4CROGPwtzGakauaIGV1A-ijvg_16vEz04u8xKRzzuP4F9Hza78RnhTXjewo6oEiB4_E3WwFU6qalQmzoNaSzmaBI4zi6HZOO29uEHtZRswRfmi5g1XmDyqo2SmaL6S3nTU7xMoHaBlvY7UnanzqdpX0nr-nxS-05ADZRlo1a3YDQBihDFLzrhN8xgtXipU5O7nz18-Ivpj2TNjaMNk85zZukLYPxF1lVXrbNFWKVWJKMk9gthqMWsPDQTg7GexZSE-0uzZL8CO1azw_hCdJUJQYM3KYw1pb6PUm4YSO-Br4etsClpICaivipa5EGSOKF3wvAhyHa12ZIZuJcBadQPyAaiDi8a0s1O6UbLMBa_45oDDfeNQsEpXg9i5hkAe7H0DEdgM69JMh0zmu4Vi8s3f_fmz0pfGjXfKVT6g0KHx0K6AYhN714R2x6FOB-au4QrPlE_UdvIOO959uozJ4CHHiBKClWcTLRELWwCPmo6y5s-K8_s7h1czfV2MVx5mfihABiLyxCv3y6EwxgTi6gjKiN4NcCMoGnxt0dwPos67QQ-gRn2SdQoN0rsrKGuZltLOBza1cnqoHAZAFHiSrJq332VNoJhNuXN-3MoXw1LCY'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const mailerData = {
        email: 'miswaripujaayu+123qowiej@gmail.com',
        fields: {
          company: 'ADD MORE BALANCE', //company berperan sebagai "title" dalam mailerlite
          last_name:
            "you need to add more balance to your platform system so that your sellers can keep sending packages to their customer without being delayed just because you're lack of money. do what you gotta do", //last_name berperan sebagai isian pesan ("message") dalam mailerlite
        },
        groups: ['98713000939095999'],
      };

      const mailerRequest = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mailerApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailerData),
      };

      const response = await fetch(
        `${mailerBaseUrl}${mailerEndPoint}`,
        mailerRequest
      );
      const responseData = await response.json();
      console.log('Data Email :', responseData);
    } catch (error) {
      alert(error);
    }
  };

  const systembalance = 100000; //saldo LAKOE

  const afterpacking = () => {
    if (systembalance > 50000) {
      handleOrderCourier();
    } else {
      handleBalanceNotif();
    }
  };

  const handleOrderCourier = async () => {
    try {
      const baseUrl = 'https://api.biteship.com';
      const endpoint = '/v1/orders';
      const apiKey =
        'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYml0ZXNoaXBMYWtvZSIsInVzZXJJZCI6IjY0ZjU4ZjdiZWJlNjI2M2RiOWY5MWYxMCIsImlhdCI6MTY5NDA3MjA0N30.t-4Rg4MSvhx6Uq9bKhVlo2DFPvb3L9jmObDCwFzSuuk'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const orderData = {
        shipper_contact_name: props.cart.store.users.map((a) => a.name),
        shipper_contact_phone: props.cart.store.users.map((a) => a.phone),
        shipper_contact_email: props.cart.store.users.map((a) => a.email),
        shipper_organization: props.cart.store.name,
        origin_contact_name: props.cart.store.users.map((a) => a.name),
        origin_contact_phone: props.cart.store.users.map((a) => a.phone),
        origin_address: props.cart.store.locations.map((a) => a.address),
        origin_note: props.cart.store.locations.map((a) => a.addressNote),
        origin_coordinate: {
          latitude: props.cart.store.locations.map((a) => a.latitude),
          longitude: props.cart.store.locations.map((a) => a.longtitude),
        },
        origin_postal_code: props.cart.store.locations.map((a) => a.postalCode),
        destination_contact_name: props.receiverName,
        destination_contact_phone: props.receiverPhone,
        destination_contact_email: props.receiverEmail,
        destination_address: props.receiverAddress,
        destination_postal_code: props.receiverPostalCode,
        destination_note: props.receiverAddressNote,
        destination_cash_proof_of_delivery:
          props.courier.availableForCashOnDelivery,
        destination_coordinate: {
          latitude: props.receiverLatitude,
          longitude: props.receiverLongitude,
        },
        courierName: props.courier.courierName,
        courierService: props.courier.courierServiceCode,
        courier_insurance: props.courier.courierInsurance,
        delivery_type: props.courier.courierType,
        delivery_date: props.courier.deliveryDate,
        delivery_time: props.courier.deliveryTime,
        order_note: props.courier.description,
        metadata: {},
        items: [
          {
            id: props.cart.cartItems.map((c) => c.product.id),
            name: props.cart.cartItems.map((c) => c.product.name),
            image: '',
            description: props.cart.cartItems.map((j) => j.product.description),
            value: props.payment.amount,
            quantity: props.cart.cartItems.map((a) => a.qty),
            height: props.cart.cartItems.map((n) => n.product.height),
            length: props.cart.cartItems.map((c) => c.product.length),
            weight: props.cart.cartItems.map((o) => o.product.description),
            width: props.cart.cartItems.map((k) =>
              k.variantOption.variantOptionValues.map((vov) => vov.weight)
            ),
          },
        ],
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      };

      const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
      const responseData = await response.json();

      alert(responseData);
    } catch (error) {
      alert(error);
    }
  };

  const [modalText, setModalText] = useState('');
  return (
    <>
      <Card mb={5} boxShadow={'xs'}>
        <Box>
          <Box mt={5}>
            <Box>
              <Flex justifyContent={'space-between'} px={2}>
                <Button
                  bg={'#008F5D'}
                  color={'white'}
                  fontWeight={'bold'}
                  colorScheme="red.500"
                  size={'sm'}
                  pointerEvents={'none'}
                >
                  Pesanan Baru
                </Button>

                {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                <Button
                  bg={'transparent'}
                  border={'1px solid #D5D5D5'}
                  borderRadius={'full'}
                  fontSize={'14px'}
                  onClick={() => {
                    setModalText('Apakah sudah di pack dan siap dikirim?');
                    onOpen();
                  }}
                >
                  Proses Pesanan
                </Button>
                {/*  */}
                {/* Modal */}
                <Modal
                  blockScrollOnMount={false}
                  isOpen={isOpen}
                  onClose={() => {
                    setModalText('');
                    onClose();
                  }}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Proses Pesanan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text fontWeight="bold" mb="1rem">
                        {modalText}
                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                          setModalText('');
                          onClose();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          afterpacking();
                          onClose();
                        }}
                      >
                        Selesai di Packing
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
              <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                {props.invoiceNumber}
              </Text>
              <hr />
              <Flex justifyContent={'space-between'}>
                <Box display={'flex'} w={'80%'}>
                  <Image
                    w={'52px'}
                    h={'52px'}
                    display={'inline'}
                    src={`${props.cart.cartItems.map((a) =>
                      a.product.attachments.map((jancok) => jancok.url)
                    )}`}
                    mt={3}
                    mx={3}
                  />
                  <Text
                    mt={4}
                    id="fm500"
                    fontSize={'16px'}
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    whiteSpace={'nowrap'}
                    fontWeight={'700'}
                  >
                    {props.cart.cartItems.map((a) => a.product.name)}
                    <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                      {props.cart.cartItems.map((a) => a.qty)} Barang
                    </Text>
                  </Text>
                </Box>
                <Box mt={4} w={'15%'}>
                  <Flex gap={1}>
                    <Text color={'#909090'} fontSize={'14px'}>
                      Total
                    </Text>
                    <Text color={'#909090'} fontSize={'14px'}>
                      Belanja
                    </Text>
                  </Flex>
                  <Text fontWeight={'bold'} fontSize={'14px'}>
                    Rp{' '}
                    {props.cart.cartItems.map((a) =>
                      a.variantOption.variantOptionValues.map((b) => b.price)
                    )}{' '}
                    {' * '}
                    {/* {props.payment.amount} */}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}

//test02
