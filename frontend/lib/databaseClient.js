import createClient from '@sanity/client'

export const client = createClient({
    projectId: '6njdwlk5',
    dataset: 'production',
    apiVersion: '2022-03-25',
    token:
        'skiy5Qck44mvmhKuCi2bK7Vk2JLFyf75Hg7eTQbVFltdE0JfmxEVaGn4eLOms8eVGNXJCJsNfVB8tJ1BPV27HZPcNmzo8S5iRNBBAJumANGhIQr2suIkvyjxSc71oCwlnYNwKeeY3acplF2POicJMbV5gB4RZEGxJKzkOx97PgPEDGY5GoLx',
    useCdn: false,
})