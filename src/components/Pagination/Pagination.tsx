import type { ComponentType } from 'react';
import ReactPaginateModule, {
  type ReactPaginateProps,
} from 'react-paginate';
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  forcePage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
