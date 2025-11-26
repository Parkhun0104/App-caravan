import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from './ui/Logo';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                <Logo />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                            <Link to="/" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                둘러보기
                            </Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                        대시보드
                                    </Link>
                                    <div className="relative ml-3 flex items-center gap-4">
                                        <span className="text-sm text-gray-700">안녕하세요, {user.name}님</span>
                                        <button
                                            onClick={handleLogout}
                                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                                        >
                                            <LogOut className="h-5 w-5" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                        로그인
                                    </Link>
                                    <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium">
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                                둘러보기
                            </Link>
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                                        대시보드
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                                        로그인
                                    </Link>
                                    <Link to="/register" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                                        회원가입
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; 2025 CaravanShare. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
