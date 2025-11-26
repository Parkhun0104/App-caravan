import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { CreditCard, Lock, X } from 'lucide-react';

const PaymentModal = ({ amount, onClose, onConfirm, isLoading }) => {
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(cardData);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'number') {
            value = value.replace(/\D/g, '').slice(0, 16);
        } else if (name === 'expiry') {
            value = value.replace(/\D/g, '').slice(0, 4);
            if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (name === 'cvc') {
            value = value.replace(/\D/g, '').slice(0, 3);
        }
        setCardData({ ...cardData, [name]: value });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center space-x-2">
                        <Lock className="w-5 h-5 text-green-600" />
                        <h2 className="text-lg font-bold text-gray-900">Secure Payment</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <p className="text-gray-500 text-sm">Total Amount</p>
                        <p className="text-3xl font-bold text-gray-900">${amount}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Cardholder Name"
                            name="name"
                            required
                            value={cardData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />

                        <div className="relative">
                            <Input
                                label="Card Number"
                                name="number"
                                required
                                value={cardData.number}
                                onChange={handleChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength={16}
                            />
                            <CreditCard className="absolute right-3 top-9 text-gray-400 w-5 h-5" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Expiry (MM/YY)"
                                name="expiry"
                                required
                                value={cardData.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                            <Input
                                label="CVC"
                                name="cvc"
                                required
                                value={cardData.cvc}
                                onChange={handleChange}
                                placeholder="123"
                                maxLength={3}
                                type="password"
                            />
                        </div>

                        <Button type="submit" className="w-full mt-4" size="lg" isLoading={isLoading}>
                            Pay ${amount}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center">
                            <Lock className="w-3 h-3 mr-1" />
                            Payments are secure and encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
