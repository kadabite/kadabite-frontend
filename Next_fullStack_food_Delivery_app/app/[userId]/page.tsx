// // import Form from '@/app/ui/invoices/edit-form';
// import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { notFound } from 'next/navigation';

// import { Metadata } from 'next';
 
// export const metadata: Metadata = {
//   title: 'Edit',
// };

// export default async function Page({ params }: { params: { userId: string } }) {
//   const id = params.userId;
//   // const [invoice, customers] = await Promise.all([
//   //   fetchInvoiceById(id),
//   //   fetchCustomers(),
//   // ]);
//   // if (!invoice) {
//   //   notFound();
//   // }

//   return (
//     <main>
//       <Breadcrumbs
//         breadcrumbs={[
//           { label: 'Invoices', href: '/dashboard/invoices' },
//           {
//             label: 'Edit Invoice',
//             href: `/dashboard/invoices/${id}/edit`,
//             active: true,
//           },
//         ]}
//       />
//       {/* <Form invoice={invoice} customers={customers} /> */}
//     </main>
//   );
// }
