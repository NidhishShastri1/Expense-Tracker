import React from 'react';
import { Target, Shield, Zap, Heart } from 'lucide-react';

const About = () => {
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="text-2xl font-bold" style={{ marginBottom: '1rem', fontSize: '3rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Manage Your Wealth
                </h1>
                <p className="text-secondary" style={{ fontSize: '1.25rem' }}>
                    FINTRACK is the ultimate tool to take control of your financial future.
                    Simple, intuitive, and powerful.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', marginBottom: '1rem' }}>
                        <Target size={32} className="text-primary" style={{ color: '#3b82f6' }} />
                    </div>
                    <h3 className="text-xl font-bold" style={{ marginBottom: '0.5rem' }}>Track Goals</h3>
                    <p className="text-secondary">Set financial targets and monitor your progress with precision.</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', marginBottom: '1rem' }}>
                        <Shield size={32} className="text-success" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ marginBottom: '0.5rem' }}>Secure Data</h3>
                    <p className="text-secondary">Your financial data is encrypted and stored securely.</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', marginBottom: '1rem' }}>
                        <Zap size={32} className="text-warning" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ marginBottom: '0.5rem' }}>Fast & Fluid</h3>
                    <p className="text-secondary">Experience a lightning-fast interface with modern aesthetics.</p>
                </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
                <div style={{ flex: 1 }}>
                    <h2 className="text-2xl font-bold" style={{ marginBottom: '1rem' }}>Why Expense Tracker?</h2>
                    <p className="text-secondary" style={{ marginBottom: '1rem' }}>
                        We believe that financial freedom starts with awareness. By understanding where your money goes, you can make informed decisions that align with your life goals.
                    </p>
                    <p className="text-secondary">
                        Built by developers who care about user experience, utilizing the latest web technologies to deliver a seamless product.
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}>
                    <Heart size={64} color="#ec4899" />
                </div>
            </div>
        </div>
    );
};

export default About;
