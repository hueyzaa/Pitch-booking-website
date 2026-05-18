import { flattenMenu } from '@app/utils/menuUtils';
import { Input, List } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { sidebarNavigation } from '../layouts/main/sider/sidebarNavigation';
import { SearchOutlined } from '@ant-design/icons';

// eslint-disable-next-line react-refresh/only-export-components
export const highlightMatch = (text: string, keyword: string) => {
  if (!keyword) return text;

  //Todo tạo regex để tìm keyword
  const regex = new RegExp(`(${keyword})`, 'gi');
  //Todo tách title thành cách phần riêng biệt
  const parts = text.split(regex);

  //Todo phần nào trùng thì sẽ highlight
  return parts.map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark key={index} style={{ backgroundColor: '#ffc069', padding: 0 }}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const MenuSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  //Todo: làm phẳng menu và lưu nó lại dưới dạng allMenu, sd useMemo để tránh rerender
  const allMenus = useMemo(() => flattenMenu(sidebarNavigation), []);

  //Todo: Hàm lọc ra menu phù hợp với nội dung cần tìm kiếm
  const filteredMenus = useMemo(() => {
    //Todo: Nếu tìm kiếm rỗng thì trả về []
    if (!searchTerm.trim()) return [];
    //Todo lọc ra title trong menu có chứa từ khóa cần tìm hay không
    return allMenus.filter((menu) => t(menu.title).toLowerCase().includes(searchTerm.toLowerCase()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, allMenus]);

  //Todo hàm highlight từ khóa trùng

  const handleSearch = () => {
    const key = searchTerm;
    if (key === '') return;
    setSearchTerm('');
    navigate(`/search/${encodeURIComponent(key)}`);
  };

  return (
    <>
      <div>
        <Input.Search
          placeholder='Tìm kiếm menu...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
          allowClear
          enterButton
          size='small'
          style={{ padding: '0px 1rem' }}
          // style={{ margin: '0px 30px' }}
        />
        {searchTerm && (
          <List
            bordered
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              zIndex: 1,
              background: 'white',
              margin: '0px 1rem',
              position: 'absolute'
            }}
            dataSource={filteredMenus}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setSearchTerm('');
                  navigate(item.url!);
                }}
                style={{ cursor: 'pointer', border: 'none' }}
              >
                <SearchOutlined style={{ fontSize: 16, color: '#999', marginRight: 5 }} />
                {highlightMatch(t(item.title), searchTerm)}
              </List.Item>
            )}
            locale={{
              emptyText: 'Không tìm thấy kết quả phù hợp'
            }}
          />
        )}
      </div>
    </>
  );
};

export default MenuSearch;
