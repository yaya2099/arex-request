import { DownOutlined } from '@ant-design/icons';
import { Tree, TreeProps } from 'antd';
import { FC, useMemo, useState } from 'react';

import CollectionNode from './CollectionNode';
interface CollectionProps {
  treeData: any;
  onSelect: TreeProps['onSelect'];
}
const Collection: FC<CollectionProps> = ({ treeData, onSelect }) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const selectedKeys = [''];
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand: any = (newExpandedKeys: string[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  function onDrop() {
    console.log('');
  }
  const newData = useMemo(() => {
    const loop = (data: any[]): any[] =>
      data.map((item) => {
        const title = <CollectionNode value={item} />;
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }
        return {
          title,
          key: item.key,
        };
      });
    return loop(treeData);
  }, [treeData]);
  return (
    <div>
      <Tree
        treeData={newData}
        showLine={true}
        blockNode={true}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onExpand={onExpand}
        onSelect={onSelect}
        switcherIcon={<DownOutlined />}
        draggable={{ icon: false }}
        onDrop={onDrop}
      />
    </div>
  );
};

export default Collection;
