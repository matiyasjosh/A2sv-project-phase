import { useForm } from 'react-hook-form'

const FormPart = () => {
  const form = useForm<formValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  type formValues = {
    userName: string
    email: string
    msg: string
  }

  const onSubmit = (data: formValues) => {
    console.log("Submitted data: ", data)
  }

  return (
    <>
      <fieldset>
        <legend>Contact Form</legend>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="userName">User-name </label>
          <input type="text" id="userName" {...register("userName", { 
            required: {
              value: true,
              message: "user name is required"
            }
            })} />
          <p className='error'>{errors.userName?.message}</p>
            

          <label htmlFor="email">Email</label>
          <input type="eamil" id="email" {...register("email", {
            required: {
              value: true,
              message: "enter your email"
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "incorrect email format"
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue != "admin@example.com" || "enter a different email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") || "use a supported domain"
                )
              }
            }
          })} />
          <p className='error'>{errors.email?.message}</p>

          <label htmlFor="msg">Message</label>
          <input type="text" id="msg" {...register("msg", {
            required: {
              value:true,
              message: "write something"
              }})} />
          <p className='error'>{errors.msg?.message}</p>

          <button id="submit">Submit</button>
        </form>
      </fieldset>

    </>
  );
};

export default FormPart;
