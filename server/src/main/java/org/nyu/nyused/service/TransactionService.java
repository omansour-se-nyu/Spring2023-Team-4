package org.nyu.nyused.service;

import org.nyu.nyused.entity.Transaction;
import org.nyu.nyused.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    public Transaction saveTransaction(Transaction transaction){
        return transactionRepository.save(transaction);
    }
    public List<Transaction> getTransaction(){
        return transactionRepository.findAll();
    }

}
