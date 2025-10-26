"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { formSchema } from "./schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { editPostDataType } from "@/app/post-details/[id]/page";

interface Props {
  formSubmitHandler: (data: editPostDataType, reset: () => void) => void;
  isEditForm?: boolean;
  postDetails?: any;
  loading: boolean;
}

const PostInputform = ({
  formSubmitHandler,
  isEditForm = false,
  postDetails,
  loading,
}: Props) => {
  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: postDetails ? postDetails.title : "",
      description: postDetails ? postDetails.description : "",
      tagId: postDetails ? postDetails.tagId : "",
    },
  });

  const { mutate, isPending: tagAddApiPending } = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = axios.post("/api/tags/create", data);
      return response;
    },
  });

  const {
    register: tagInputRegister,
    handleSubmit: tagInputFormHandleSubmit,
    reset: tagInputFormReset,
  } = useForm({
    defaultValues: {
      tagNameInput: "",
    },
  });
  const tagAddSubmitHandler = (data: any) => {
    const payload = {
      name: data.tagNameInput,
    };
    mutate(payload, {
      onSuccess: () => {
        tagInputFormReset();
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        setTagModalOpen(false);
      },
    });
  };

  const { data: allTags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await axios.get("/api/tags/get-all");
      return data.data;
    },
  });

  return (
    <Card className="w-full sm:max-w-md bg-slate-900 text-gray-300 border-none h-fit">
      <CardHeader>{!isEditForm && <CardTitle>Add Post</CardTitle>}</CardHeader>
      <CardContent>
        <form
          id="form-rhf-demo"
          onSubmit={handleSubmit((data) => formSubmitHandler(data, reset))}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-title"
                    className="text-gray-300"
                  >
                    Title:
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter post title"
                    autoComplete="off"
                    className="border-gray-500"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-demo-description"
                    className="text-gray-300"
                  >
                    Description:
                  </FieldLabel>
                  <InputGroup className="border-gray-500">
                    <InputGroupTextarea
                      {...field}
                      className="border-gray-500"
                      id="form-rhf-demo-description"
                      placeholder="Enter description"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="tagId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-rhf-complex-billingPeriod"
                    className="text-gray-300 flex justify-between "
                  >
                    Select Tag:
                    <Dialog open={tagModalOpen} onOpenChange={setTagModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="flex items-center text-pink-600 cursor-pointer hover:underline">
                          Add tag <Plus className="w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md py-4">
                        <form
                          id="tag-add-form"
                          className="flex flex-col gap-3"
                          onSubmit={(e) => {
                            e.stopPropagation();
                            tagInputFormHandleSubmit(tagAddSubmitHandler)(e);
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle>Enter tag name:</DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                              <Input {...tagInputRegister("tagNameInput")} />
                            </div>
                          </div>
                          <DialogFooter className="">
                            <Button
                              type="submit"
                              form="tag-add-form"
                              className="bg-pink-600 text-gray-900 hover:bg-pink-700 cursor-pointer"
                            >
                              {tagAddApiPending ? "Adding..." : "Add"}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-complex-billingPeriod"
                      aria-invalid={fieldState.invalid}
                      className="border-gray-500"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-gray-300">
                      {allTags?.map((tag: any, index: number) => (
                        <SelectItem className="" key={index} value={tag.id}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="">
        <Field orientation="horizontal" className="flex justify-end">
          <Button
            type="button"
            className="py-5 bg-inherit border text-gray-300 hover:bg-slate-800 border-slate-500 cursor-pointer"
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            form="form-rhf-demo"
            className="py-5 bg-pink-700 text-black hover:bg-pink-800 cursor-pointer"
          >
            {loading
              ? isEditForm
                ? "Editing..."
                : "Submitting..."
              : isEditForm
              ? "Edit"
              : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default PostInputform;
