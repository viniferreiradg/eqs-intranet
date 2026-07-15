import type { Meta, StoryObj } from '@storybook/react';
import { BookOpen } from 'lucide-react';
import { SearchResultItem } from './SearchResultItem';

const meta: Meta<typeof SearchResultItem> = {
  title: 'Primitives/SearchResultItem',
  component: SearchResultItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Linha genérica de resultado de busca — usada na página de Pesquisa. O slot `leading` é livre (miniatura, ícone outline ou date-badge), permitindo reaproveitar a mesma linha para notícias, eventos, comunicados, departamentos e links úteis.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SearchResultItem>;

export const WithImage: Story = {
  render: () => (
    <div style={{ width: 500, border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
      <SearchResultItem
        leading={<img className="searchResultItemImage" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200" alt="" />}
        title={<>Workshop BIM 4.0 reúne equipe técnica no auditório principal</>}
        description="O evento apresentou as novas ferramentas de modelagem tridimensional..."
        meta={<span>08 dez 2026</span>}
      />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ width: 500, border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
      <SearchResultItem
        leading={<span className="searchResultItemIcon"><BookOpen size={18} /></span>}
        title={<>Central de <mark className="searchHighlight">Workshops</mark></>}
        description="Acesse materiais, apresentações e gravações dos workshops realizados pela EQS."
        showChevron
      />
    </div>
  ),
};
