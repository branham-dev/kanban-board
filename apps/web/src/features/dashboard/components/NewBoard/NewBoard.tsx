import styles from './NewBoard.module.scss';
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import Input from '../ui/Input/Input';
import ViewContainer from '../ui/ViewContainer/ViewContainer';
import Button from '../ui/Button/Button';
import iconCross from '@/assets/icon-cross.svg';
import type { CreateBoardPayload } from '@kanban/shared';
import { narrowError } from '@/utils';
import { toast } from 'sonner';
import { useModal } from '@/app/providers/modal';
import { useNavigate } from 'react-router-dom';
import { useCreateBoardMutation } from '../../api';

type Inputs = {
  name: string;
  columns?: {
    name: string;
  }[];
};

const initialValues: Inputs = {
  name: '',
  columns: [{ name: '' }],
};

const NewBoard = () => {
  const [createBoard] = useCreateBoardMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const { closeModal } = useModal();
  const navigate = useNavigate();

  const createNewBoard: SubmitHandler<Inputs> = async (data) => {
    const payload: CreateBoardPayload = {
      name: data.name,
      columns: data.columns ?? [],
    };
    try {
      const response = await createBoard(payload).unwrap();
      closeModal();
      navigate(`/dashboard/${response.id}`);
    } catch (error) {
      const message = narrowError(error);
      toast.error(message);
    }
  };

  return (
    <>
      <article onClick={(e) => e.stopPropagation()}>
        <ViewContainer>
          <h3 className={styles.title}>Add New Board</h3>

          <form onSubmit={handleSubmit(createNewBoard)}>
            <Input
              id="boardName"
              label="Name"
              placeholder="e.g. Web Design"
              labelClass={styles.boardInput}
              error={errors.name?.message}
              {...register('name', {
                required: 'Board name is required',
                minLength: {
                  value: 2,
                  message: 'Board name must be at least 2 characters long.',
                },
              })}
            />
            {fields.length > 0 && <label className={styles.label}>Columns</label>}
            <div className={styles.fieldList}>
              {fields.map((field, index) => (
                <div key={field.id} className={styles.fieldContainer}>
                  <Input
                    placeholder="eg: TODO"
                    className={styles.input}
                    {...register(`columns.${index}.name`, {
                      required: 'Column name is required',
                      minLength: {
                        value: 2,
                        message: 'Column name must be at least 2 characters long.',
                      },
                    })}
                    error={errors.columns?.[index]?.name?.message}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                    }}
                    className={styles.removeButton}
                  >
                    <img src={iconCross} alt="remove icon" />
                  </button>
                </div>
              ))}
            </div>
            {fields.length < 5 && (
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  append({ name: '' });
                }}
                className={styles.addButton}
              >
                + Add New Column
              </Button>
            )}
            <Button type="submit" className={styles.button}>
              Create New Board
            </Button>
          </form>
        </ViewContainer>
      </article>
    </>
  );
};

export default NewBoard;
