import { json } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

// Fetching data store, bankAccount, withdraw
export async function getStoreData(id: string) {
  return json(
    await db.store.findMany({
      where: {
        id: '50',
      },
      include: {
        bankAccounts: {
          include: {
            withdraws: true,
          },
        },
      },
    })
  );
}

//BankAccount CRUD
export async function getBankList(storeId: string) {
  return json(
    await db.bankAccount.findMany({
      where: {
        storeId: '50',
      },
    })
  );
}

export async function deleteBankList(id: string) {
  await db.withdraw.updateMany({
    where: { bankId: id },
    data: { bankId: null || undefined },
  });

  await db.bankAccount.delete({
    where: { id: id },
  });
  return { success: true };
}

export async function getNameBank(bank: string) {
  return await db.bankAccount.findFirst({
    where: {
      bank: bank,
    },
  });
}

export async function createBank(data: any) {
  const createdBank = await db.bankAccount.create({
    data: {
      store: {
        connect: { id: '50' },
      },
      accountName: data.accountName,
      bank: data.bank,
      accountNumber: data.accountNumber,
    },
  });

  return createdBank;
}

export async function updateBank(
  Id: string,
  updateAccountName: string,
  updateBankName: string,
  updateAccountNumber: string
) {
  try {
    const updatedBank = await db.bankAccount.update({
      where: {
        id: Id,
      },
      data: {
        accountName: updateAccountName,
        bank: updateBankName,
        accountNumber: updateAccountNumber,
      },
    });
    return updatedBank;
  } catch (error) {
    console.error('error updating', error);
    throw error;
  }
}

//Withdraw
export async function getWithdrawalList() {
  return await db.withdraw.findMany({
    include: {
      store: {
        select: {
          name: true,
        },
      },
    },
  });
}

export async function createWithdraw(
  data: any,
  id: any,
  storeId: string,
  approvedById: string
) {
  try {
    const amount = parseFloat(data.amount);

    const user = await db.user.findUnique({
      where: { id: '50' },
    });

    if (!user) {
      throw new Error('User with id not found.');
    }

    const bankAccount = await db.bankAccount.findUnique({
      where: {
        id: id,
      },
    });

    if (!bankAccount) {
      throw new Error('Bank Account Id not found.');
    }

    const bankId = bankAccount.id;

    const withdraw = await db.withdraw.create({
      data: {
        store: {
          connect: { id: '50' },
        },
        amount: amount,
        status: 'REQUEST',
        attachment: data.attachment,
        bankAccount: {
          connect: { id: bankId },
        },
        approvedBy: {
          connect: { id: '1' },
        },
      },
    });

    // console.log("Withdraw created:", withdraw);
    return withdraw;
  } catch (error) {
    console.error('Error creating withdrawal:', error);
    throw error;
  }
}

export async function deleteWithdraw(id: string) {
  return await db.withdraw.delete({
    where: { id: id },
  });
}
