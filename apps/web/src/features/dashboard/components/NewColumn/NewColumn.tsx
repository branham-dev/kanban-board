import { useParams } from 'react-router-dom';
import Button from '../ui/Button/Button';
import ViewContainer from '../ui/ViewContainer/ViewContainer';
import styles from './NewColumn.module.scss';
import { useAddColumnMutation } from '../../api';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { AddColumnPayload } from '../../types';
import { narrowError } from '@/utils';
import { toast } from 'sonner';
import Input from '../ui/Input/Input';

type Inputs = {
  name: string;
};

type NewColumnProps = {
  onClose: () => void;
};

const NewColumn = ({ onClose }: NewColumnProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { boardId } = useParams();
  const [addColumn] = useAddColumnMutation();

  if (!boardId) {
    console.error('No board ID!');
    return;
  }

  const createNewColumn: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const payload: AddColumnPayload = {
      name: data.name,
      boardId: boardId,
      position: 0,
    };
    try {
      const response = await addColumn(payload).unwrap();
      onClose();
      console.log(response);
    } catch (error) {
      const message = narrowError(error);
      toast.error(message);
    }
  };

  return (
    <article onClick={(event) => event.stopPropagation()} className={styles.newColumn}>
      <ViewContainer>
        <h3 className={styles.title}>Add New Column</h3>
        <form onSubmit={handleSubmit(createNewColumn)}>
          <Input
            id="columnName"
            label="Column Name"
            placeholder="eg: TODO"
            error={errors.name?.message}
            {...register('name', {
              required: 'Column name is required',
              minLength: {
                value: 2,
                message: 'Column name must be at least 2 characters long.',
              },
            })}
          />
          <Button type="submit" className={styles.button}>
            Add
          </Button>
        </form>
      </ViewContainer>
    </article>
  );
};

export default NewColumn;
