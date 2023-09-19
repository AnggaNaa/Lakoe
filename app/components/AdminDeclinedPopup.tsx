import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';

import { LuZoomIn } from 'react-icons/lu';
import { AdminDeclinedNotification } from '~/modules/DashboardMailerlite/mailerliteAdminDeclined';

export default function AdminDeclinedPopup(props: any) {
  const [formData, setFormData] = useState({
    reasonAdminDeclained: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Flex justifyContent={'center'}>
        <Text
          onClick={onOpen}
          cursor={'pointer'}
          color={'white'}
          bg={'teal'}
          padding={'5px 15px'}
          borderRadius={'15px'}
        >
          <LuZoomIn />
        </Text>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pt={6} pb={2}>
            <Box
              padding={'10px'}
              fontSize={'13px'}
              my={'10px'}
              mx={'10px'}
              borderRadius={'10px'}
              boxShadow="base"
              p="6"
              rounded="md"
              bg="white"
            >
              <Box>
                <Text display={'flex'}>
                  Nomor Penarikan: <Text fontWeight={700}>123ASD</Text>
                </Text>
                <Text>Dibuat 6 September 2023 pukul 15:45 </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>Adira Salahudi</Text>
                  <Text fontSize={'12px'}>Dumbways Store</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>Status: Declined</Text>
                </Box>
              </Flex>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Informasi Bank</Text>
                <Flex>
                  <Text width={'150px'}>Nama Bank</Text>
                  <Text>: BNI</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nomor Rekening</Text>
                  <Text>: 0460541966</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nama Pemilik</Text>
                  <Text>: Adira Salahudi</Text>
                </Flex>
              </Box>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Rincian</Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Jumlah Penarikan</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 1.000.000</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Admin</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 10.000</Text>
                </Flex>
                <Text fontSize={'10px'} color={'grey'}>
                  *1% jumlah penarikan
                </Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Transfer</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 10.000</Text>
                </Flex>
                <Divider my={'5px'} py={'1px'} bg={'grey'} />
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Saldo yang diterima</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 980.000</Text>
                </Flex>
              </Box>

              <Box mt={'10px'}>
                <Form>
                  <FormControl>
                    <FormLabel fontSize={'12px'} fontWeight={700}>
                      Alasan Penolakan
                    </FormLabel>
                    <Input
                      type="text"
                      name="reasondAdminDeclined"
                      value={formData.reasonAdminDeclained}
                      fontSize={'10px'}
                      onChange={(event) => handleChange(event)}
                    />
                  </FormControl>
                  <Button
                    fontSize={'12px'}
                    colorScheme="teal"
                    width={'100%'}
                    textAlign={'center'}
                    mt={'10px'}
                    onClick={() => {
                      onClose();
                      AdminDeclinedNotification(formData.reasonAdminDeclained);
                    }}
                  >
                    Send email to Seller
                  </Button>
                </Form>
              </Box>

              <Box mt={'10px'}>
                <Text fontWeight={700}>Riwayat</Text>
                <UnorderedList>
                  <ListItem>
                    Permintaan ditolak oleh Admin A{' '}
                    <ListItem ml={'20px'}>
                      6 September 2023 pukul 15:15
                    </ListItem>
                  </ListItem>

                  <ListItem>
                    Permintaan dibuat{' '}
                    <ListItem ml={'20px'}>
                      6 September 2023 pukul 15:05
                    </ListItem>
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="teal"
              mr={3}
              onClick={onClose}
              color={'white'}
              border={'1px solid'}
              borderColor={'gray.500'}
              fontSize={'12px'}
            >
              Selesai
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
