import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/projects/ColorPicker";

export function AddNewProjectDialog() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="hover:bg-brand-yellow text-background bg-foreground">
            <Plus className="h-4 w-4" />
            <p>Add New Project</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add new Project</DialogTitle>
            <DialogDescription>
              Fill in the details for your new project.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name" name="name" placeholder="Project Name" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Project description"
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Color</Label>
              <ColorPicker value="blue" onChange={() => {}} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
