alter function public.review_summary(text) security invoker;
revoke execute on function public.has_role(uuid, app_role) from anon, public;
grant execute on function public.has_role(uuid, app_role) to authenticated;
create policy "No direct access to submission log" on public.review_submission_log for select to authenticated using (false);