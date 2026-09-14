import type { ComponentType } from 'react';
import ReactPaginateModule, {
  type ReactPaginateProps,
} from 'react-paginate';
import css from './Pagination.module.css';

type PaginateModule = {
  default: ComponentType<ReactPaginateProps>;
};

const ReactPaginate = (
  ReactPaginateModule as unknown as PaginateModule
).default;

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination = ({
  pageCount,
  forcePage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;