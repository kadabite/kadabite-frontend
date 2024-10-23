'use server';

import { z } from 'zod';
// import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { myRequest } from '@/app/api/graphql/utils';
import { FORGOT_PASSWORD, LOGIN, RESET_PASSWORD, CREATE_USER, UPDATE_USER, REGISTER_USER } from '@/app/query/user.query';
import { Message } from '@/lib/graphql-types';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';


// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),

  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

// const CreateInvoice = FormSchema.omit({ id: true, date: true });
// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function createInvoice(prevState: State, formData: FormData) {
//     const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }

//   // Prepare data for insertion into the database
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];

//   try {
//     await sql`
//     INSERT INTO invoices (customer_id, amount, status, date)
//     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//   `;
//   } catch(error) {
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');

// }

// export async function updateInvoice(id: string, prevState: State, formData: FormData) {

//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch(error) {
//       return { message: 'Database Error: Failed to Update Invoice.' };
//   }
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice.' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }

export async function updatePassword(
  prevState: string | undefined,
  formData: FormData
) {
  let data;
  try {
    const variables = {
      email: formData.get('email'),
      token: formData.get('token'),
      password: formData.get('password'),
    };

    const response = await myRequest(RESET_PASSWORD, variables);
    data = response.updatePassword;
    return data;
  } catch (error) {
    data.message = 'An error occurred during password reset.';
    return data;
  }
}


export async function sendPasswordResetEmail(
  prevState: string | undefined,
  formData: FormData
) {
  let data;
  try {
    const variable = {
      email: formData.get('email'),
    };
    const response = await myRequest(FORGOT_PASSWORD, variable);
    data = response.forgotPassword;
      return data;
    } catch (error) {
      data.message = 'An error occurred during password reset.';
      return data;
  }
}

export async function signUpUser(
  prevState: string | undefined,
  formData: FormData
 ) {
  let data;
  try {
    const variables = {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      password: formData.get('password')
    };
    const response = await myRequest(CREATE_USER, variables);
      data = response.createUser;
      return data;

  } catch (error) {
    console.log(error);
    if (data) data.message = 'An error occurred during signup.';
    else data = { message: 'An error occurred during signup.' };
    return data;
  }
 };


export async function registerUser(
  prevState: string | undefined,
  formData: FormData,
) {
  let data;
  try {
    const variables = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      userType: formData.get('userType'),
      lga: formData.get('lga'),
      vehicleNumber: formData.get('vehicleNumber'),
      username: formData.get('username'),
      longitude: formData.get('longitude'),
      latitude: formData.get('latitude'),
      state: formData.get('state'),
      country: formData.get('country'),
      address: formData.get('address'),
      token: formData.get('token'),
    };
    const response = await myRequest(REGISTER_USER, variables);
    data = response.registerUser;
    return data;

  } catch (error) {
    console.log(error);
    if (data) data.message = 'An error occurred during registeration.';
    else data = { message: 'An error occurred during registeration.' };
    return data;
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  let data;
  try {
    const variables = {
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      password: formData.get('password'),
    };
    const response = await myRequest(LOGIN, variables);
    data = response.login;
    return data;

  } catch (error) {

    if (data) data.message = 'An error occurred during authentication.';
    else data = { message: 'An error occurred during authentication.' };
    return data;
  }
}
