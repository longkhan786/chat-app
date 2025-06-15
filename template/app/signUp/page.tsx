'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useUserService } from '@/composables';

const signupSchema = z.object({
    username: z.string().min(2),
    email: z.string().email(), 
    password: z.string().min(8),
    mobileNumber: z.string(),
});

export default function SignupPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const { signUp } = useUserService();

    const onSubmit = async (data: any) => {
        const res = await signUp(data);
        if (res.ok) {
            router.push('/login');
        } else {
            alert('Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input {...register('username')} placeholder="Full Name" />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>
                        <div>
                            <Input {...register('email')} placeholder="Email" />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input {...register('password')} placeholder="Password" type="password" />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        <div>
                            <Input {...register('mobileNumber')} placeholder="Mobile Number" type="number" />
                            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>}
                        </div>

                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        Already have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
