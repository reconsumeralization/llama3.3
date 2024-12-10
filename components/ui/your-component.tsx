import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const YourComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => console.log("Item 1 selected")}>
          Item 1
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log("Item 2 selected")}>
          Item 2
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default YourComponent;
