import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const retorno = {
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    };

    return response.json(retorno);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const typeLowerCase = type.toLocaleLowerCase();

    const craeteTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = craeteTransaction.execute({
      title,
      value,
      type: typeLowerCase,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
