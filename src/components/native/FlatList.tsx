import React, { useMemo } from 'react';
import { FlatListProps } from '../../types/native';

export function FlatList<T>({
  data,
  renderItem,
  keyExtractor,
  ListHeaderComponent,
  ListEmptyComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  className = '',
}: FlatListProps<T>) {
  const renderedItems = useMemo(() => {
    if (!data || data.length === 0) return null;

    return data.map((item, index) => {
      const key = keyExtractor ? keyExtractor(item, index) : String(index);
      const isLast = index === data.length - 1;

      return (
        <React.Fragment key={key}>
          {renderItem({ item, index })}
          {!isLast && ItemSeparatorComponent && <ItemSeparatorComponent />}
        </React.Fragment>
      );
    });
  }, [data, renderItem, keyExtractor, ItemSeparatorComponent]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {ListHeaderComponent && <div className="shrink-0">{ListHeaderComponent}</div>}

      {data && data.length > 0 ? (
        <div className="flex flex-col w-full divide-y divide-[#18231c]">
          {renderedItems}
        </div>
      ) : (
        ListEmptyComponent && <div className="shrink-0">{ListEmptyComponent}</div>
      )}

      {ListFooterComponent && <div className="shrink-0">{ListFooterComponent}</div>}
    </div>
  );
}
